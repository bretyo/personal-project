const bcrypt = require('bcryptjs');
module.exports={
    register: async(req,res)=>{
        const db = req.app.get('db');
        const {email,password} = req.body
        const [result] = await db.auth.check_email(email);
        if(result){
            return res.status(409).send('Email Taken.')
        }
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash)
        const [user] = await db.auth.register_user(email, hash)
        delete user.password
        req.session.user = user;
        return res.status(200).send(req.session.user)
    },
    login: async(req,res)=>{
        const db = req.app.get('db')
        const {email, password} = req.body;
        const [user] = await db.auth.check_email(email)
        if(!user){
            console.log('User not found!')
            return res.status(401).send('User not found')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.user_password)
        if(!isAuthenticated){
            console.log('password incorrect error!')
            return res.status(401).send('Password Incorrect!')
        }
        delete user.password;
        req.session.user = user;
        return res.status(200).send(req.session.user);

    },
    logout:(req,res)=>{
        req.session.destroy()
        res.sendStatus(200);
    },

    // getUser: (req,res)=>{
    //     const db = req.app.get('db');
    //     const {user} = req.session;
    //     if(!user){
    //         return res.status(511).send('User not logged in')
    //     }


    // },
    deleteUser:async (req,res)=>{
        const db = req.app.get('db')
        const {user_id} = req.session.user;
        await db.auth.delete_user(user_id)
        req.session.destroy()
        res.sendStatus(200);
    },
    changePassword:async(req,res)=>{
        const db = req.app.get('db')
        const {email, oldPassword, newPassword} = req.body;
        const {user} = req.session;
        if(!user){
            return res.status(511).send('User not logged in')
        }
        const [result] = await db.auth.check_email(email);
        if(!result){
            return res.status(409).send('No such email exists!')
        }
        const isAuthenticated = bcrypt.compareSync(oldPassword, result.user_password)
        delete result;
        if(!isAuthenticated){
            console.log('password incorrect error!')
            return res.status(401).send('Password Incorrect!')
        }
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(newPassword, salt);
        
        const [_user] = await db.auth.change_password(user.user_id, hash)
        delete _user.password
        req.session.user = _user;
        return res.status(200).send(req.session.user)
    }
}