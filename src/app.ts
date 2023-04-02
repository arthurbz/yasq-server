import "express-async-errors"
import express from "express"
import cors from "cors"

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Hello world, this is YASQ's Server!")
})

export { app }
