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

router.get('/', UsersController.getUsers);
router.post('/register', validationUserBody, validationUsedEmail, UsersController.createUser);
router.post('/login', validationUserBody, UsersController.login);

module.exports = router;