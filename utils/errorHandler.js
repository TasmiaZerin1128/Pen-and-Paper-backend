
class AppError extends Error{
    constructor(message, statusCode, isOperational){
        super(message);
        this.statusCode = statusCode;
        this.isOperational  = isOperational;
        // Error.captureStackTrace(this, this.constructor);
    }
}

class SequelizeValidationError extends Error {
    constructor(err, statusCode){
        let errMessage;
        err.errors.map(e => {
            console.log(e.message);
            errMessage = e.message;
        })
        super(errMessage);
        this.statusCode = statusCode;
    }
}

module.exports = { AppError, SequelizeValidationError }