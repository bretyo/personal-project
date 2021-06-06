module.exports = (io,socket)=>{
    const sendPrompt=(body)=>{
        console.log(body)
        io.to(body.playerId).emit('receive-prompt', body.prompt)
    }
    
    const roundEnd=(body)=>{
        io.to(body.roomId).emit('round-end-client')
    }

    const sendHostResponse=(body)=>{
        socket.to(body.gameSocketId).emit('send-host-response', body)
    }

    const serverSendClientsVotes=(body)=>{
        io.to(body.playerID).emit('server-send-clients-votes', body)
    }

    const serverSendHostVote=(body)=>{
        socket.to(body.hostId).emit('server-send-host-vote', body.vote)
    }

    const sendClientStats=(body)=>{
        const {playerID, win} = body
        io.to(playerID).emit('send-client-stats', {win})
    }

    socket.on('send-prompt', sendPrompt)
    socket.on('round-end-server', roundEnd)
    socket.on('client-send-response', sendHostResponse)
    socket.on('host-send-votes',serverSendClientsVotes)
    socket.on('client-send-vote', serverSendHostVote)
    socket.on('game-end', sendClientStats)
}