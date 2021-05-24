module.exports={
    getPrompts: async (req,res)=>{
        const db = req.app.get('db')
        const {game_id} = req.params;
        const {type} = req.query
        try {
            const prompts = await db.prompts.get_prompts(game_id, type)
            res.status(200).send(prompts)

        } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong getting prompts! Error: ', err)
        }
    }
}