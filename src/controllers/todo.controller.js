const TodoService = require('../services/todo.service');
const Sentry = require('@sentry/node');
const { validationResult } = require('express-validator');

class TodoController {
    async findTodoById(id) {
        try {
            const todo = await TodoService.getTodoById(id);
            return !!todo;
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
                const { title } = req.body;
                const idUser = req.idUser;
                const todo = {
                    title: title,
                    isCompleted: false,
                    idUser: idUser
                };
                const newTodo = await TodoService.addTodo(todo);
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