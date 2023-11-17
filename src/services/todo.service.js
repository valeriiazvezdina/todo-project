const { todoModel } = require('../models/models');

class TodoService {
    async getTodos() {
        return await todoModel.findAll();
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
        return await todoModel.update({ isCompleted: !todo.isCompleted })
    }
    async deleteTodo(id) {
        return await todoModel.destroy({ where: {
            id: id
        }});
    }
}

module.exports = new TodoService();