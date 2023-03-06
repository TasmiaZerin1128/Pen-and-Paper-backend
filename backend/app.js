const express = require('express');
const app = express();
const userRouter = require('./routes/user');


const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`App started on ${PORT}` );
});


app.use(express.json());
app.use('/api/users', userRouter);

module.exports = app;