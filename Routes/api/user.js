const express = require('express');
const router = express.Router();
const db = require("../../app/models");
const config = require('config');
const jwt = require('jsonwebtoken');

const User = db.user;
const bcrypt = require('bcryptjs');


router.post('/add',(req, res) => {
    const { username, email, password } = req.body;
   
    if (!username || !email || !password) { return res.status(400).json({ msg: "fill all field" }) };
    User.findOne( { where: { email: email } } ).then(user => {
         if  (user) { return res.status(400).json({ msg: "user already exist" }) }  });

   
    const newUser = new User({
        username: username,
        email: email,
        password: password
    });
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) =>{
                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecred'),
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({

                                token,
                            user: {
                                name: user.username,
                                email: user.email,
                                id: user.id
                            }
                        })
                    }
                )
            }
            
           )
        })
    })



}
)

module.exports = router;