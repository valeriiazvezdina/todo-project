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
        .custom(async id => {
            const isExisting = await TodoController.findTodoById(id);
            if (!isExisting) throw new Error('not found todo with such id');
        })
];

/**
 * @swagger
 * /api/todos/:
 *  get:
 *      description: Returns all todos
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Not authorized
 *          '403':
 *              description: Access error
 *          default:
 *              description: Error 
 */
router.get('/', authenticateToken, TodoController.getTodos);

/**
 * @swagger
 * /api/todos/:
 *  post:
 *      description: Adds new todo
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: new todo
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title: 
 *                  type: string
 *                  description: todo's title
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Not authorized
 *          '403':
 *              description: Access error
 *          default:
 *              description: Error 
 */
router.post('/', authenticateToken, validationTodoBody, TodoController.addTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *  patch:
 *      description: Edits todo
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: todo's id
 *          required: true
 *      requestBody:
 *        description: edited todo
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title: 
 *                  type: string
 *                  description: todo's title
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Not authorized
 *          '403':
 *              description: Access error
 *          default:
 *              description: Error 
 */
router.patch('/:id', authenticateToken, validationExistingId, validationTodoBody, TodoController.editTitle);

/**
 * @swagger
 * /api/todos/{id}/isCompleted:
 *  patch:
 *      description: Switches todo's isCompleted
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: todo's isCompleted
 *          required: true
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Not authorized
 *          '403':
 *              description: Access error
 *          default:
 *              description: Error 
 */
router.patch('/:id/isCompleted', authenticateToken, validationExistingId, TodoController.editIsCompleted);

/**
 * @swagger
 * /api/todos/{id}:
 *  delete:
 *      description: Deletes todo
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: deleted todo
 *          required: true
 *      responses:
 *          '200':
 *              description: Successful response
 *          '400':
 *              description: Bad request
 *          '401':
 *              description: Not authorized
 *          '403':
 *              description: Access error
 *          default:
 *              description: Error 
 */
router.delete('/:id', authenticateToken, validationExistingId, TodoController.deleteTodo);

module.exports = router;