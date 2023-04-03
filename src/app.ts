import "express-async-errors"
import express from "express"
import cors from "cors"
import { router } from "./router"

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(router)

export { app }
