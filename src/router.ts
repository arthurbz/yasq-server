import { Router } from "express"
import { searchRouter } from "./routers/SearchRouter"

const router = Router()

router.use("/search", searchRouter)

export { router }
