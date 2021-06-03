module.exports = (io,socket)=>{
    const sendPrompt=(body)=>{
        console.log(body)
        io.to(body.playerId).emit('receive-prompt', body.prompt)
    }
    
    const roundEnd=(body)=>{
        io.to(body.roomId).emit('round-end-client')
    }

    const sendHostResponse=(body)=>{
        io.to(body.gameSocketId).emit('send-host-response', body)
    }

    const serverSendClientsVotes=(body)=>{
        socket.to(body.answers[0].roomId).emit('server-send-clients-votes', body)
    }

    socket.on('send-prompt', sendPrompt)
    socket.on('round-end-server', roundEnd)
    socket.on('client-send-response', sendHostResponse)
    socket.on('host-send-votes',serverSendClientsVotes)
}