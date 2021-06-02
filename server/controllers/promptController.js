const {createApi} = require('unsplash-js')
const nodeFetch = require('node-fetch')
// UNSPLASH INIT
const {UNSPLASH_KEY} = process.env
const unsplash = createApi({ accessKey: UNSPLASH_KEY, fetch: nodeFetch});

module.exports={
    getPrompts: async (req,res)=>{
        const db = req.app.get('db')
        const {game_id} = req.params;
        try {
            const prompts = await db.prompts.get_prompts(game_id)
            res.status(200).send(prompts)

        } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong getting prompts! Error: ', err)
        }
    },
    getImages: async (req,res)=>{
        try {
            const images = await unsplash.photos.getRandom({
                count: 30,
            })
            res.status(200).send(images)
            
        } catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong getting Images!',err)
        }
    }
}