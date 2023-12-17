const app = require('./index');
const { testDbConnection } = require('./src/config/db');

const PORT = +process.env.PORT;

/* listening server */
app.listen(PORT, async () => {
    await testDbConnection();
    console.log(process)
    console.log(`Server is running on port ${PORT}`);
});