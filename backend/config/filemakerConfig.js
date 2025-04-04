//config/filemakerConfig.js
require('dotenv').config();

module.exports = {
    apiUrl: process.env.FILEMAKER_API_URL,
    username: process.env.FILEMAKER_USER,
    password: process.env.FILEMAKER_PASSWORD,
};