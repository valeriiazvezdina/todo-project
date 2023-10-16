const fs = require('fs');

class TodoService {
    getTodos() {
        return new Promise((res, rej) => {
            fs.readFile('todos.json', 'utf-8', (err, data) => {
                if (err) throw err;
                const todos = JSON.parse(data);
                res(todos);
            });
        });
    }
    async addTodo(todo) {
        const todos = await this.getTodos();
        todos.push(todo);
        return new Promise((res, rej) => {
            fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err;
                res(todos);
            });
        });
    }
    async editTitle(id, title) {
        const todos = await this.getTodos();
        let newTodo = {};
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                newTodo = { ...todo };
                newTodo.title = title;
                return newTodo;
            }
            return todo;
        });
        return new Promise((res, rej) => {
            fs.writeFile('todos.json', JSON.stringify(updatedTodos), (err) => {
                if (err) throw err;
                res(newTodo);
            });
        });
    }
    async editIsCompleted(id) {
        const todos = await this.getTodos();
        let newTodo = {};
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                newTodo = { ...todo };
                newTodo.isCompleted = !newTodo.isCompleted;
                return newTodo;
            }
            return todo;
        });
        return new Promise((res, rej) => {
            fs.writeFile('todos.json', JSON.stringify(updatedTodos), (err) => {
                if (err) throw err;
                res(newTodo);
            });
        });
    }
    async deleteTodo(id) {
        const todos = await this.getTodos();
        const index = todos.findIndex(todo => todo.id === id);
        todos.splice(index, 1);
        return new Promise((res, rej) => {
            fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
                if (err) throw err;
                res(todos);
            });
        });
    }
}

module.exports = new TodoService();