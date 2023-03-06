const express = require('express');
const userRouter = require('./routes/user.route');
const dotenv = require('dotenv');

const connectToDatabase = require("./db.config");

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

connectToDatabase();

const app = express();

app.listen(PORT, () => {
    console.log(`App started on ${PORT}` );
});


app.use(express.json());

app.use('/api/users', userRouter);

module.exports = app;