const { userModel } = require('../models/models');

class UsersService {
    async getUsers() {
        return await userModel.findAll();
    }
    async createUser(user) {
        return await userModel.create({ 
            email: user.email,
            password: user.password 
        });
    }
    async getUserByEmail(email) {
        return await userModel.findOne({ raw: true, where: {
            email: email
        }});
    }
}

module.exports = new UsersService();