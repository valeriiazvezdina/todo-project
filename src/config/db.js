const { Sequelize } = require('sequelize');

/**
 * Connection to local DB
 */
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: process.env.DB_HOST,
//       dialect: 'postgres'
//     }
// );

/**
 * Connection to DB in render.com
 */
const sequelize = new Sequelize(
    'postgres://zvezdval:Y3Ua8Pn2Xu9VrlzWeYGPibxe7E61DUjr@dpg-clf2dufjc5ks7393hoog-a.frankfurt-postgres.render.com/postgres_4rpy?ssl=true',
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
);

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