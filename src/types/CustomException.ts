import { UnprocessableEntity } from "./exceptions/UnprocessableEntity.js"
import { BadRequest } from "./exceptions/BadRequest.js"

type CustomException =
    Error
    & UnprocessableEntity
    & BadRequest

export { CustomException }
