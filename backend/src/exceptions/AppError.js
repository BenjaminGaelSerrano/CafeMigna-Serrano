class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
        this.name=this.constructor.name;
    }
}

export class BadRequestError extends AppError {
    constructor(message){
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message){
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message){
        super(message, 409);
    }
}

export default AppError;
