const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { prisma } = require('../prisma/prismaDB')
// const { verifyGoogleToken } = request('../../config/google-auth')

function generateJWTToken (payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
}

// on route /login
async function loginUser (req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      return res.status(403).json({ message: 'Incorrect Email or Password' })
    }

    const passMatch = await bcrypt.compare(req.body.password, user.password)

    if (passMatch) {
      delete user.refresh_token // Need some test
      // Create JWT Token
      const accessToken = generateJWTToken(user)
      const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET)

      // Store refreshToken in DB
      await prisma.user.update({
        where: {
          email: user.email
        },
        data: {
          refresh_token: refreshToken
        }
      })

      res.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        user
      })
    } else {
      return res.status(403).json({ message: 'Incorrect Email or Password' })
    }
  } catch (err) {
    next(err)
  }
}

// on route /refresh-token
async function createNewToken (req, res, next) {
  const refreshToken = req.body.refresh_token
  const userUUID = req.body.user_uuid

  try {
    const user = await prisma.user.findFirst({
      where: {
        uuid: userUUID,
        refresh_token: refreshToken
      }
    })
    if (!user) {
      return res.status(403).json({ message: 'Unauthorized Access!' })
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, userData) => {
      if (err) return res.status(403)

      const accessToken = generateJWTToken(user)

      res.json({
        access_token: accessToken
      })
    })
  } catch (err) {
    next(err)
  }
}

// delete /logout
async function revokeAccessToken (req, res, next) {
  const refreshToken = req.body.refresh_token
  const userUUID = req.body.user_uuid

  try {
    const updatedUser = await prisma.user.updateMany({
      where: {
        uuid: userUUID,
        refresh_token: refreshToken
      },
      data: {
        refresh_token: ''
      }
    })

    if (updatedUser.count === 0) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    return res.status(204).json({ message: 'Success' })
  } catch (err) {
    next(err)
  }
}


// async function signinWithGoogle (req, res, next) {
//   try {

//     const verificationResponse = await verifyGoogleToken(req.body.credential);
//     if (verificationResponse.error) {
//       return res.status(400).json({
//         message: verificationResponse.error,
//       });
//     }

//     const profile = verificationResponse?.payload;

//     // const existsInDB = DB.find((person) => person?.email === profile?.email);

//     // if (!existsInDB) {
//     //   register user
//     // }
    
//     return res.status(201).json({
//       message: "Signup was successful",
//       user: {
//         firstName: profile?.given_name,
//         lastName: profile?.family_name,
//         picture: profile?.picture,
//         email: profile?.email,
//         token: jwt.sign({ email: profile?.email }, "myScret", {
//           expiresIn: "1d",
//         }),
//       },
//     });
//   } catch (err) {
//     next(err)
//   }
// }

exports.loginUser = loginUser
exports.createNewToken = createNewToken
exports.revokeAccessToken = revokeAccessToken
