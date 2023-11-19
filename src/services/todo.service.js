const { todoModel } = require('../models/models');

class TodoService {
    async getTodos(idUser) {
        return await todoModel.findAll({ raw: true, where: {
            idUser: idUser
        }});
    }
    async getTodoById(id) {
        return await todoModel.findOne({ raw: true, where: {
            id: id
        }});
    }
    async addTodo(todo) {
        return todoModel.create({ 
            title: todo.title,
            isCompleted: todo.isCompleted,
            idUser: todo.idUser
        })
    }
    async editTitle(id, title) {
        return await todoModel.update({ title: title }, { 
            where: {
                id: id
            }
        });
    }
    async editIsCompleted(id) {
        const todo = await todoModel.findOne({ raw: true, where: {
            id: id
        }});
        return await todoModel.update({ isCompleted: !todo.isCompleted }, { where: {
            id: id
        }});
    }
    async deleteTodo(id) {
        return await todoModel.destroy({ where: {
            id: id
        }});
    }
}

module.exports = new TodoService();