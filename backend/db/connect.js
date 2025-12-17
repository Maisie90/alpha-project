require('dotenv').config()

console.log("running connect.js to create db")

console.log("DB_URL:", process.env.DB_URL || '<missing>');
if (!process.env.DB_URL) throw new Error('DB_URL not provided in environment');

const { Pool } = require('pg')
const db = new Pool ({       
    connectionString: process.env.DB_URL,     
})
module.exports = db