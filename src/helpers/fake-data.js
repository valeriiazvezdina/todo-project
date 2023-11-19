const FakeUsersGenerator = require('./fake-users');

const N = 3;

FakeUsersGenerator.createFakeUsers(N)
                                .then(res => {
                                    console.log('Fake users were created');
                                })
                                .catch(err => {
                                    console.log(`Error with creating fake users: ${err}`);
                                });