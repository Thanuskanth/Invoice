const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../../app/models");

const User = db.user;
const auth =require('../../middleware/auth');
const { json } = require('body-parser');

router.get('/',auth,(req, res) =>
    User.findAll()
        .then(user => res.json(user))
);

router.post('/add',(req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body,"req.body")
    if (!username || !email || !password) { return res.status(400).json({ msg: "fill all field" }) };
    User.findOne({  where: { email: email } }).then(user => { if (user) { return res.status(400).json({ msg: "user already exist" }) } });
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
);

router.delete('/:id',auth,(req, res) => {
    User.destroy({where: { id: req.params.id }})
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}
);

router.get('/:id',auth,(req, res) => {
    const user = User.findByPk(req.params.id)
        .then((user) => res.json(user))


});

router.post('/password/:id', auth, (req, res) => {
    const { oldpassword, newpassword, conformpassword } = req.body;
    if (!oldpassword || !newpassword || !conformpassword) {
        return res.status(400).json("fill all fields!")

    };
    if (newpassword !== conformpassword) { return res.status(400).json("conform password does not match") }
    User.findByPk(req.params.id).then(user =>
        bcrypt.compare(oldpassword, user.password).then((ismatch) => {
            if (!ismatch) { return res.status(400).json("old password credencials does not match") }

            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newpassword, salt, (err, hash) => {
                    password = hash;
                    User.update(password, { where: { id: req.params.id }}).then(() =>
                        User.findByPk(req.params.id).then((user) => res.json(user)).catch(err => { res.status(400).json(err) })
                    ).catch(err => { res.status(400).json(err) })
                })
            )
        }


        ).catch(err => { res.status(400).json(err) })
    )

});
router.post('/:id', auth, (req, res) => {

    User.update(req.body,{ where: { id: req.params.id }}).
       then((user) => res.json(user)).catch((err)=>res.status(400).json(err))
    
});

module.exports = router;