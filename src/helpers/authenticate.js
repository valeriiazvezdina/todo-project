const Sentry = require('@sentry/node');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    try {
        const authenticateHeaders = req.headers.authorization;
        const token = authenticateHeaders?.split(' ')[1];
        if (!token) {
            res.status(401).send('token must be provided');
        } else {
            jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
                if (err) {
                    res.status(403).send('access error');
                } else {
                    console.log(user)
                    req.body.idUser = user.id;
                    next();
                }
            })
        }
    } catch(err) {
        Sentry.captureException(err);
    }
};

module.exports = authenticateToken;