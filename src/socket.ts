import { io } from "./app.js"
import { RoomMultiton } from "./room/RoomMultiton.js"

io.on("connection", socket => {
    socket.on("joinRoom", (action, callback) => {
        const roomId = action.roomId
        if (!roomId) return

        socket.join(roomId)
        callback()
    })

    socket.on("currentState", roomId => {
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)
        socket.emit("currentState", room.getState())
    })

    socket.on("play", action => {
        const roomId = action.roomId
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)
        room.play()
        io.in(room.id).emit("play")

        io.in(roomId).emit("stateChanged", action)
    })

    socket.on("pause", action => {
        const roomId = action.roomId
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)
        room.pause()
        io.in(room.id).emit("pause")
        io.in(roomId).emit("stateChanged", action)
    })

    socket.on("textMessage", action => {
        io.in(action.roomId).emit("textMessage", action)
    })
})
