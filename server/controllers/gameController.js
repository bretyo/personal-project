module.exports = {
    getGames: async (req,res)=>{
        const db = req.app.get('db')
        const games = await db.games.get_games()
        if(games===null){
            return res.status(500).send('Something went wrong, please refresh page!')
        }
        res.status(200).send(games)
    }
}