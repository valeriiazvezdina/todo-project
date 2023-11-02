const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;