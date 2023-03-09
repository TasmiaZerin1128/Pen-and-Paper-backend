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
app.use(express.urlencoded({extended:true}));

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }

    res.status(500);
    res.send('500: Internal server error');
});

app.use('/api/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json({
      success: 'false',
      message: 'Page not found',
      error: {
        statusCode: 404,
        message: 'You reached a route that is not defined on this server',
      },
    });
});

module.exports = app;