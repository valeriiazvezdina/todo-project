const app = require('./index');
const { connectDb } = require('./mongo-db/db');

const PORT = +process.env.PORT;

/* listening server */
app.listen(PORT, async () => {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
});