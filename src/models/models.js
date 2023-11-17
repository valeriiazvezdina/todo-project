const userModel = require('./user.model');
const todoModel = require('./todo.model');

// /* Creating the model */
// userModel.sync()
//                 .then(() => {
//                     console.log('User model was created successfully');
//                 })
//                 .catch(err => {
//                     console.log(err.message);
//                 });

// /* Creating the model */
// todoModel.sync()
//                 .then(() => {
//                     console.log('Todo model was created successfully');
//                 })
//                 .catch(err => {
//                     console.log(err.message);
//                 });

/* Setting up the relations */
userModel.hasMany(todoModel, { foreignKey: 'idUser' });
todoModel.belongsTo(userModel, { foreignKey: 'idUser' });

module.exports = {
    userModel,
    todoModel
};