const express = require('express');
const cors = require('cors');
const app = express();

//Middleware to parese JSON Bodies (Handling data from frontend)
app.use(express.json());
app.use(cors());

//check if backend is working
app.get('/',(req, res) => {
    res.status('200').send('Server is Running');

});

app.use("/users", userRouter);

module.exports = app;