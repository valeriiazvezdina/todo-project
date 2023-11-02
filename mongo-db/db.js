const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

async function connectDb() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Successful connection to MongoDb');
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    connectDb
};