const express = require('express');
const userRouter = require('./routes/user.route');
const dotenv = require('dotenv');
const bodyparser = require('body-parser')

const database = require("./db.config");

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

database.connectToDatabase();

const app = express();

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
});


app.use(express.json());
// Body-parser middleware
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRouter);

module.exports = app;