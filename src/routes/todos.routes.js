const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todo.controller');
const { body, param } = require('express-validator');
const authenticateToken = require('../helpers/authenticate');

const validationTodoBody = [
    body('title')
        .notEmpty()
        .withMessage('title must be provided')
        .bail()
        .isString()
        .withMessage('title must be a string')
];

const validationExistingId = [
    param('id')
        .notEmpty()
        .withMessage('id must be provided')
        .bail()
        .isUUID()
        .withMessage('id must be uuid')
        .bail()
        .custom(async id => {
            const isExisting = await TodoController.findTodoById(id);
            if (!isExisting) throw new Error('not found todo with such id');
        })
];

router.get('/', authenticateToken, TodoController.getTodos);
router.post('/', authenticateToken, validationTodoBody, TodoController.addTodo);
router.patch('/:id', authenticateToken, validationExistingId, validationTodoBody, TodoController.editTitle);
router.patch('/:id/isCompleted', authenticateToken, validationExistingId, TodoController.editIsCompleted);
router.delete('/:id', authenticateToken, validationExistingId, TodoController.deleteTodo);

module.exports = router;