const bcrypt = require('bcrypt')

const { prisma } = require('../prisma/prismaDB')

async function createNewUser (req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await prisma.user.create({
      data: {
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPassword,
      }
    })

    return res.json({
      user_name: user.user_name,
      email: user.email,
    })
  } catch (err) {
    next(err)
  }
}

// Get info of currently loggedin user
async function getAuthenticatedUserInfo (req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id
      }
    })
    return res.json({
      user_name: user.user_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    })
  } catch (err) {
    next(err)
  }
}

exports.createNewUser = createNewUser
exports.getAuthenticatedUserInfo = getAuthenticatedUserInfo
