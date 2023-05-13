import { io } from "./app.js"
import { RoomMultiton } from "./room/RoomMultiton.js"

io.on("connection", socket => {
    socket.on("joinRoom", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        console.log("User is joining - Room:", room.id)
        socket.join(roomId)
    })

    socket.on("play", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        io.in(room.id).emit("play")
        console.log("Play - Room:", room.id)
    })

    socket.on("pause", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        io.in(room.id).emit("pause")
        console.log("Pause - Room:", room.id)
    })
})
