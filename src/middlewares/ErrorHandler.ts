import { Request, Response, NextFunction } from "express"
import { CustomException } from "../types/CustomException.js"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error: CustomException, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.statusCode ?? 500

    res.status(statusCode).send({
        statusCode,
        error: true,
        errorMessage: error.message
    })
}

export { errorHandler }
