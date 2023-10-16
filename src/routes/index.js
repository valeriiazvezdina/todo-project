const express = require('express');
const router = express.Router();

const todosRoutes = require('./todos.routes');
const usersRoutes = require('./users.routes');

router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);

module.exports = router;