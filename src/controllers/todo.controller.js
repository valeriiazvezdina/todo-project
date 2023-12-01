const TodoService = require('../services/todo.service');
const Sentry = require('@sentry/node');
const { validationResult } = require('express-validator');

class TodoController {
    async findTodoById(id) {
        try {
            return await TodoService.getTodoById(id);
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async getTodos(req, res) {
        try {
            const idUser = req.body.idUser;
            const todos = await TodoService.getTodos(idUser);
            res.status(200).send(todos);
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async addTodo(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const { idUser, title } = req.body;
                const newTodo = {
                    title: title,
                    isCompleted: false,
                    idUser: idUser
                };
                await TodoService.addTodo(newTodo);
                res.status(201).send(newTodo);
            } else {
                res.status(400).send({
                    errors: result.array()
                });
            }
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async editTitle(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const id = req.params.id;
                const title = req.body.title;
                const idExists = await TodoService.getTodoById(id);
                if (idExists) {
                    const newTodo = await TodoService.editTitle(id, title);
                    res.status(200).send(newTodo);
                } else {
                    res.status(404).send({
                        errors: 'todo with such id does not exist'
                    });
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
    async editIsCompleted(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const id = req.params.id;
                const idExists = await TodoService.getTodoById(id);
                if (idExists) {
                    const newTodo = await TodoService.editIsCompleted(id);
                    res.status(200).send(newTodo);
                } else {
                    res.status(404).send({
                        errors: 'todo with such id does not exist'
                    });
                }
                res.status(200).send(newTodo);
            } else {
                res.status(400).send({
                    errors: result.array()
                });
            }
        } catch(err) {
            Sentry.captureException(err);
        }
    }
    async deleteTodo(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const id = req.params.id;
                const idExists = await TodoService.getTodoById(id);
                if (idExists) {
                    await TodoService.deleteTodo(id);
                    res.status(200).send(newTodo);
                } else {
                    res.status(404).send({
                        errors: 'todo with such id does not exist'
                    });
                }
                res.status(200).send(true);
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

module.exports = new TodoController();