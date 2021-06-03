module.exports=(io, socket)=>{
    const startRoom = (body)=>{
        // socket.id = 'server_host' +socket.id 
        socket.join(body.code)
        socket.join(body.code + 'host')
        console.log(socket.id)
        console.log(`room ${body.code} started`)
    }

    const attemptJoin = (body)=>{
        io.to(body.code).emit('attempt-join-room', body)
    }

    const confirmJoin = (body)=>{
        console.log(body.msg)
        io.to(body.player.id).emit('join-room', body)
    }

    const rejectJoin=(body)=>{
        console.log(body.msg)
        io.to(body.player.id).emit('join-failed', body)
    }

    const playerJoin=(code)=>{
        socket.join(code)
        console.log(`player successfully joined room ${code}!`)
    }

    const forcePlayersLeave=(room)=>{
        console.log('room: ',room)
        socket.to(room).emit('leave-room')
    }

    const leaveRoomRelay=(room)=>{
        socket.leave(room)
    }

    socket.on('start-room', startRoom)
    socket.on('attempt-join', attemptJoin)
    socket.on('confirm-join', confirmJoin)
    socket.on('player-join', playerJoin)
    socket.on('reject-join', rejectJoin)
    socket.on('force-players-leave', forcePlayersLeave)
    socket.on('leave-room-relay', leaveRoomRelay)
    socket.on('disconnecting',()=>{
        const [socketid, roomNum, hostroom] = socket.rooms
        console.log(roomNum)
        hostroom && forcePlayersLeave(roomNum)
        
    })
}