const { faker } = require('@faker-js/faker');
const UsersService = require('../services/users.service');

class FakeUsersGenerator {
    createFakeUser() {
        return {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    }
    async createFakeUsers(N) {
        for (let i = 0; i < N; i++) {
            const user = this.createFakeUser();
            await UsersService.createUser(user);
        }
    }
}

module.exports = new FakeUsersGenerator();