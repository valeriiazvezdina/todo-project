const User = require('../models/user.model');

class UsersService {
    async getUsers() {
        return await User.find();
    }
    async createUser(user) {
        return await User.create(user);
    }
    async findUserByEmail(email) {
        return await User.findOne({ email: email });
    }
}

module.exports = new UsersService();