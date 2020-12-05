const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const db = require("../../app/models");
const config = require('config');
const User = db.user;

const auth = require('../../middleware/auth');

router.post('/login', (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json({msg:"fill all fields!"})

    };

    User.findOne({  where: { email: email }}).then(user =>{
        bcrypt.compare(password, user.password).then(ismathch => {
            
            if (!ismathch) { return res.status(400).json({msg:"credencials does not match"}) }
            jwt.sign(
                {id:user.id},
                config.get('jwtSecred'),
                // {expiresIn:3600},
                (err,token)=>{
                    if(err) throw err;
                    res.json({

                        token,
                        user
                    })
                }
            )
        }).catch(err =>{ res.status(400).json({msg:"Password not match"})})
     } )
        .catch(err =>{ res.status(400).json({msg:"Email does not exists"})})




})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id).select('-password').then(user => res.json(user)).catch(err =>{ res.status(400).json(err)})
})

router.get('/seed', (req, res) => {
    const role=["Admin"];
    role.map(role=>{
    const newrole=new Role({
            role
        })
        newrole.save().then((role)=>{

            bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash("admin", salt, (err, hash) => {
               

                const newuser=new User({
                    username:"Admin",
                    password:hash,
                    email:"admin@gmail.com",
                    
                })
                
            })
        )
           
        });
    })
    User.findById(req.user.id).select('-password').then(user => res.json(user)).catch(err =>{ res.status(400).json(err)})
})

module.exports = router;