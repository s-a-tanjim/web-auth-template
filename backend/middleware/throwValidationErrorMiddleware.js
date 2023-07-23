const { validationResult } = require('express-validator')

function throwIfError (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const arr = errors.array()
    var msg = "Invalid input on "
    arr.forEach(val => {
      msg = msg + val.path + ", "
    })
    msg = msg.slice(0, -2)
    return next({
      message: msg,
      status: 403
    })
  }

  return next()
}

exports.throwIfError = throwIfError
