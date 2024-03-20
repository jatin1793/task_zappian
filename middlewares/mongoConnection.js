const mongoose = require("mongoose");
const env_config = require("../config/env_config");

exports.connectDB = async () => {
    try {
        await mongoose.connect(env_config.mongodb_url);
        console.log(`DB connected`);
    } catch (error) {
        console.log(error.message);
    }
};

