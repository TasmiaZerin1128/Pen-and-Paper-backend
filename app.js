const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const database = require('./db.config');

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

database.connectToDatabase();

const app = express();
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
});
app.use(express.json());
// Body-parser middleware
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    return res.status(500).send('500: Internal server error');
});

const globalErrorHandler = (err, req, res) => {
    res.status(err.statusCode).send(err.message);
};

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
