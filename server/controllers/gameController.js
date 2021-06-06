module.exports = {
    getGames: async (req,res)=>{
        const db = req.app.get('db')
        const games = await db.games.get_games()
        if(games===null){
            return res.status(500).send('Something went wrong, please refresh page!')
        }
        res.status(200).send(games)
    },
    addPlay: async(req,res, next)=>{
        const db = req.app.get('db')
        const {game_id} = req.params
        try {
            await db.games.add_to_plays(game_id)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        next();
    }
}