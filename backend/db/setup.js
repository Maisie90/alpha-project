require ('dotenv').config()
const fs = require('fs')

const db = require('./connect')

const countriesSql = fs.readFileSync('./backend/db/countries.sql').toString()  // sql represents this file
const questionsSql = fs.readFileSync('./backend/db/questions.sql').toString()
const answersSql = fs.readFileSync('./backend/db/answers.sql').toString()

db.query(countriesSql)
    .then(() => db.query(questionsSql))
    .then(() => db.query(answersSql)) 
    .then((data) => { 
        db.end()      
        console.log('Setup complete');
    })
        .catch((error) => console.log(error)) 