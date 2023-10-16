const fs = require('fs');

class UsersService {
    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('users.json', 'utf-8', (err, data) => {
                if (err) throw err;
                const users = JSON.parse(data);
                res(users);
            });
        });
    }
    async createUser(user) {
        const users = await this.getUsers();
        users.push(user);
        return new Promise((res, rej) => {
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) throw err;
                res(user);
            });
        });
    }
}

module.exports = new UsersService();