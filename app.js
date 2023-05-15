const express = require('express');
const router = require('./routes/index');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const database = require("./db.config");
const syncModels = require('./models/index');

const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

database.connectToDatabase();
syncModels();

const app = express();
app.use(cookieParser());

app.listen(PORT, HOST, () => {
    console.log(`App started on ${PORT}`);
});

app.use(cors(
  { 
    // origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true 
  }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || 'Oops! something went wrong. Please try again';
  res.status(statusCode).send(msg);
}

app.use('/api/v1', router);

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