const UsersService = require('../services/users.service');
const Sentry = require('@sentry/node');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

class UsersController {
    async findEmail(email) {
        try {
            const users = await UsersService.getUsers();
            const isUsed = users.some(user => user.email === email);
            return isUsed;
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async getUsers(req, res) {
        try {
            const users = await UsersService.getUsers();
            res.status(200).send(users);
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async createUser(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const { email, password } = req.body;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const newUser = await UsersService.createUser({
                    idUser: uuid(),
                    email: email,
                    password: hashedPassword
                });
                res.status(201).send(newUser);
            } else {
                res.status(400).send({
                    errors: result.array()
                });
            }
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async login(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const { email, password } = req.body;
                const users = await UsersService.getUsers();
                const user = users.find(user => user.email === email);
                if (!user) {
                    res.status(404).send('user with such email does not exist');
                } else {
                    const validate = await bcrypt.compare(password, user.password);
                    if (!validate) {
                        res.status(403).send('wrong password');
                    } else {
                        const token = jwt.sign(user, SECRET_TOKEN);
                        res.status(200).send({
                            token: token
                        });
                    }
                }
            } else {
                res.status(400).send({
                    errors: result.array()
                });
            }
        } catch(err) {
            Sentry.captureException(err);
        }
    }
}

module.exports = new UsersController();