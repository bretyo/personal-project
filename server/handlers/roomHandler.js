module.exports=(io, socket)=>{
    const attemptJoin = (body)=>{
        io.to(body.code).emit('attempt-join-room', body.player)
    }

    const startRoom = (body)=>{
        socket.join(body.code)
        console.log(`room ${body.code} started`)
    }

    const confirmJoin = (body)=>{
        console.log(body.msg)
        io.to(body.id).emit('join-room', body)
    }

    const rejectJoin=(body)=>{
        console.log(body.msg)
        io.to(body.id).emit('join-failed', body)
    }

    const playerJoin=(code)=>{
        socket.join(code)
        console.log('player successfully joined!')
    }

    socket.on('start-room', startRoom)
    socket.on('attempt-join', attemptJoin)
    socket.on('confirm-join', confirmJoin)
    socket.on('player-join', playerJoin)
    socket.on('reject-join', rejectJoin)
}