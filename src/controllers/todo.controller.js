const TodoService = require('../services/todo.service');
const Sentry = require('@sentry/node');
const { validationResult } = require('express-validator');
const { v4: uuid } = require('uuid');

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
            const todos = await TodoService.getTodos();
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
                const newTodo = await TodoService.editTitle(id, title);
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
    async editIsCompleted(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const id = req.params.id;
                const newTodo = await TodoService.editIsCompleted(id);
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
                await TodoService.deleteTodo(id);
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