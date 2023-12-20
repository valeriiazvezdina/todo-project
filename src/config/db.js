const { Sequelize } = require('sequelize');

require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
    /**
     * Connection to DB in render.com
     */
    sequelize = new Sequelize(
        `${process.env.DB_USER_REMOTE}://${process.env.DB_USERNAME_REMOTE}:${process.env.DB_PASSWORD_REMOTE}@${process.env.DB_HOST_REMOTE}/${process.env.DB_NAME_REMOTE}?ssl=true`,
        {
        dialect: 'postgres'
        }
    );
} else {
    /**
     * Connection to local DB
     */
    sequelize = new Sequelize(
        process.env.DB_NAME_LOCAL,
        process.env.DB_USER_LOCAL,
        process.env.DB_PASSWORD_LOCAL,
        {
            host: process.env.DB_HOST_LOCAL,
            dialect: 'postgres',
            port: 5433
        }
    );
}

async function testDbConnection() {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Connection has been established successfully');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sequelize,
    testDbConnection
};