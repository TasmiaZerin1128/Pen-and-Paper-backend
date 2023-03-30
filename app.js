const express = require('express');
const router = require('./routes/index');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const database = require("./db.config");

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

database.connectToDatabase();

const app = express();
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || 'Oops! something went wrong. Please try again';
  res.status(statusCode).send(msg);
}

app.use('/api', router);

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

app.use(globalErrorHandler);

module.exports = app;