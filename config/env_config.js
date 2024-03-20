require('dotenv').config();

const env_config = {
    jwt_secret : process.env.JWT_SECRET,
    jwt_token_expire : process.env.JWT_TOKEN_EXPIRE,

    mongodb_url : process.env.MONGODB_URL,
    frontend_url: process.env.FRONTEND_URL,
}

module.exports = env_config;