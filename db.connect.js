const mongoose = require('mongoose');

const initializeDatabase = async () => {
    const mongoURI = process.env.mongoURI;
    await mongoose.connect(mongoURI)
    console.log("connected to database successfully")
}

module.exports = initializeDatabase