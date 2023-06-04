const jwt = require('jsonwebtoken')

function verifyToken (req, res, next) {
  const authHeader = req.headers.authorization // Bearer TOKEN

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ message: 'Unauthorized Access' })

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err || !user) {
      return res.status(403).json({ message: 'Unauthorized Access' })
    }
    req.user = user
    next()
  })
}

exports.verifyToken = verifyToken
