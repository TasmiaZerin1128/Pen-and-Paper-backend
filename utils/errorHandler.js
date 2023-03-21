
class ValidationError extends Error{
    constructor(message,statusCode, isOperational){
        super(message);
        this.statusCode = statusCode;
        this.isOperational  = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
    
}

module.exports = ValidationError 