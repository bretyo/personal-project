module.exports={
    getStats: async (req,res)=>{
        const db = req.app.get('db');
        try {
            const stats = await db.stats.get_user_stats(req.session.user.user_id)
            if(!stats){
                return res.status(500).send('Error in stat retrieval! Sorry! Try re-logging.')
            }
            res.status(200).send(stats) // If no stats for player, will return an empty array
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    checkForStat: async(req,res)=>{
        const db = req.app.get('db');
        const {game_id, user_id} = req.params
        const {user} = req.session;
        try {
            const stat = await db.stats.check_for_stat(user_id, game_id)
            res.status(200).send(stat)
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    },
    addNewStat: async(req,res)=>{
        const db = req.app.get('db');
        const {game_id} = req.params;
        const {user} = req.session;
        const {wins, score, user_id} = req.body;
        try {
            await db.stats.add_new_stat(user_id, game_id, wins, score)
            res.sendStatus(200);
        } catch (err) {
            console.log(err)
            res.status(409).send('Something went wrong when adding to player stats. Error: ', err)
        }
    },
    updateStat: async(req,res)=>{
        const db = req.app.get('db');
        const {game_id} = req.params;
        const {user} = req.session;
        const {wins, score, user_id} = req.body;
        try {
            await db.stats.update_stat(user_id, game_id, wins, score)
            res.sendStatus(200);
        } catch (err) {
            console.log(err)
            res.status(409).send('Something went wrong when changing player stats. Error: ', err)
        }
    }
}