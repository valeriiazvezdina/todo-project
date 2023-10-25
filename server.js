const app = require('./index');

const PORT = +process.env.PORT;

/* listening server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});