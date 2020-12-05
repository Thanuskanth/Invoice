const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Owner = db.owners;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { owner_name ,tag} = req.body;


    if (!owner_name || !tag) {
        return res.status(400).json("fill all fields!")
    };
    const owner = new Owner(
        { owner_name ,tag}
    )
    owner.save()
    .then(owner=>res.json(owner))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Owner.destroy({where: { id: req.params.id }})
        .then(owner => res.json(owner))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
   
    Owner.update(req.body,{ where: { id: req.params.id }})
   .then((owner)=>res.json(owner)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Owner.findByPk(req.params.id).then(owners => res.json(owners))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Owner.findAll().then(owners =>res.json(owners))

        .catch(err => res.status(400).json(err));
})



module.exports = router;