module.exports=(io, socket)=>{
    const attemptJoin = (body)=>{
        io.to(body.code).emit('attempt-join-room', body.player)
    }

    const startRoom = (body)=>{
        socket.join(body.code)
        console.log(`room ${body.code} started`)
    }

    const confirmJoin = (body)=>{
        io.to(body.id).emit('join-room')
    }

    const playerJoin=(code)=>{
        socket.join(code)
        console.log('player successfully joined!')
    }

    const rejectPlayer=()=>{

    }

    socket.on('start-room', startRoom)
    socket.on('attempt-join', attemptJoin)
    socket.on('confirm-join', confirmJoin)
    socket.on('player-join', playerJoin)
}