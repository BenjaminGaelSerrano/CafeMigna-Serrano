import AppError from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";
import { error } from "../responses/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
    if(err instanceof AppError){
        return error(res, err.message, err.statusCode);
    }
    console.error(err);
    return error(res, Messages.INTERNAL_ERROR, 500);
};

export default errorHandler;
