import "express-async-errors"
import express from "express"
import cors from "cors"
import { router } from "./router.js"
import { errorHandler } from "./middlewares/ErrorHandler.js"

const app = express()

app.use(express.static("public"))
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

export { app }
