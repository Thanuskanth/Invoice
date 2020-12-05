const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Service = db.service;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { service } = req.body;


    if (!service   ) {
        return res.status(400).json("fill all fields!")
    };
    const service1 = new Service(
        {  service  }
    )
    service1.save()
    .then(service=>res.json(service))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Service.destroy({where: { id: req.params.id }})
        .then(service => res.json(service))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    Service.update(req.body,{ where: { id: req.params.id }})
   .then((service)=>res.json(service)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Service.findByPk(req.params.id).then(service => res.json(service))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Service.findAll().then(service =>res.json(service))

        .catch(err => res.status(400).json(err));
})



module.exports = router;