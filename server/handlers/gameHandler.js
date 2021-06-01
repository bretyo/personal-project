module.exports = (io,socket)=>{
    const sendPrompt=(body)=>{
        console.log(body)
        io.to(body.roomId).emit('prompt-to-join', body)
    }

    socket.on('send-prompt', sendPrompt)
}