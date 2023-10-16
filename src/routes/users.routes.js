const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller');
const { body } = require('express-validator');

const validationUserBody = [
    body('email')
        .notEmpty()
        .withMessage('email must be provided')
        .bail()
        .isEmail()
        .withMessage('email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('password must be provided')
        .bail()
        .isLength({
            min: 5
        })
        .withMessage('password length must be at least 5 characters')
];

const validationUsedEmail = [
    body('email')
        .custom(async email => {
            const isExisting = await UsersController.findEmail(email);
            if (isExisting) {
                throw new Error('email is already used');
            }
        })
];

/**
 * @swagger
 * /api/users/:
 *  get:
 *      description: Returns all users
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          default:
 *              description: Error 
 */
router.get('/', UsersController.getUsers);

/**
 * @swagger
 * /api/users/register:
 *  post:
 *      description: Creates new user
 *      parameters:
 *        - name: newUser
 *          in: body
 *          description: new user body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: user's email
 *                  password:
 *                      type: string
 *                      description: user's password
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          default:
 *              description: Error 
 */
router.post('/register', validationUserBody, validationUsedEmail, UsersController.createUser);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *      description: Signs in the user
 *      parameters:
 *        - name: user
 *          in: body
 *          description: user body
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: user's email
 *                  password:
 *                      type: string
 *                      description: user's password
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          default:
 *              description: Error 
 */
router.post('/login', validationUserBody, UsersController.login);

module.exports = router;