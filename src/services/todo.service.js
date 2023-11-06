const Todo = require('../models/todo.model');

class TodoService {
    async getTodoById(id) {
        return await Todo.findById(id);
    }
    async getTodos() {
        return await Todo.find();
    }
    async addTodo(todo) {
        return await Todo.create(todo);
    }
    async editTitle(id, title) {
        await Todo.updateOne(
                        { _id: id }, 
                        { title: title }
                    );
        return this.getTodoById(id);
    }
    async editIsCompleted(id) {
        const todo = await this.getTodoById(id);
        await Todo.updateOne(
                        { _id: id }, 
                        { isCompleted: !todo.isCompleted }
                    );
        return await this.getTodoById(id);
    }
    async deleteTodo(id) {
        return await Todo.deleteOne({ _id: id });

    }
}

module.exports = new TodoService();