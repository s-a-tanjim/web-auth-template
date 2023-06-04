const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

// Import Middleware
const authMiddleware = require('../../middleware/authMiddleware')
const throwValidationErrorMiddleware = require('../../middleware/throwValidationErrorMiddleware')
// Import Controllers
const userController = require('../../controller/userController')

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Related API
 * /api/user/signup:
 *   post:
 *     tags: [User]
 *     summary: Create New User
 *     description: Create new user in the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                user_name:
 *                  type: string
 *                  description: The user's name.
 *                  example: Leanne
 *                email:
 *                  type: string
 *                  description: The user's email.
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  description: The user's password.
 *                  example: password
 *     responses:
 *       201:
 *         description: User created
 *
*/
router.post(
  '/signup',
  body('user_name').isString(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  throwValidationErrorMiddleware.throwIfError,
  userController.createNewUser
)



/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [User]
 *     summary: Get current user info
 *     description: Get current user info
 *     responses:
 *       200:
 *         description: User info
*/
router.get(
  '/',
  authMiddleware.verifyToken,
  userController.getAuthenticatedUserInfo
)


module.exports = router
