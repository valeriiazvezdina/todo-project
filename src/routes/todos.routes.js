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

/**
 * @swagger
 * /api/todos/:
 *  get:
 *      description: Returns all todos
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
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: newTodo
 *          in: body
 *          description: new todo title
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: todo's title
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
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: param
 *          description: todo's id
 *          required: true
 *        - name: editedTodo
 *          in: body
 *          description: edited todo title
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: todo's title
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
 * /api/todos/{id}:
 *  patch:
 *      description: Switches todo's isCompleted
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: param
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
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: param
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