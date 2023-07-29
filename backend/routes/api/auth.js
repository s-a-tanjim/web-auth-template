const express = require('express')
const router = express.Router()
const { body } = require('express-validator')


// Import Controller
const authController = require('../../controller/authController')
const throwValidationErrorMiddleware = require('../../middleware/throwValidationErrorMiddleware')

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication Related API
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login User
 *     description: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The user's email.
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  description: The user's password.
 *                  example: password
 *     responses:
 *       200:
 *         description: User logged in
 *
*/
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  throwValidationErrorMiddleware.throwIfError,
  authController.loginUser
)

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags: [Authentication]
 *     summary: Generate Refresh Token
 *     description: Generate Refresh Token. Typically withing 20m the token will be expired.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                refresh_token:
 *                  type: string
 *                  description: Refresh Token.
 *                  example: random_string
 *                user_uuid:
 *                  type: string
 *                  description: The user's uuid
 *                  example: c4cb8b4f-f84e-42a8-a03e-fcc6965cba91
 *     responses:
 *       200:
 *         description: Return new token
 *
*/
router.post(
  '/refresh-token',
  body('refresh_token').exists(),
  body('user_uuid').exists(),
  throwValidationErrorMiddleware.throwIfError,
  authController.createNewToken
)

/**
 * @swagger
 * /api/auth/logout:
 *   delete:
 *     tags: [Authentication]
 *     summary: Logout User | Revoke Access Token
 *     description: Logout from the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                refresh_token:
 *                  type: string
 *                  description: Refresh Token.
 *                  example: random_string
 *                user_uuid:
 *                  type: string
 *                  description: The user's uuid
 *                  example: c4cb8b4f-f84e-42a8-a03e-fcc6965cba91
 *     responses:
 *       204:
 *         description: Logged out user
 *
*/
router.delete(
  '/logout',
  body('refresh_token').exists(),
  body('user_uuid').exists(),
  throwValidationErrorMiddleware.throwIfError,
  authController.revokeAccessToken
)


/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify Access Token
 *     description: Verify access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                access_token:
 *                  type: string
 *                  description: Access Token.
 *                  example: random_string
 *     responses:
 *       200:
 *         description: Token verified
 *
*/
router.post(
  '/verify',
  body('access_token').exists(),
  throwValidationErrorMiddleware.throwIfError,
  authController.verifyAccessToken
)

module.exports = router
