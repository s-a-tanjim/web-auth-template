const { validationResult } = require('express-validator')

function throwIfError (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.array() })
  }

  next()
}

exports.throwIfError = throwIfError
