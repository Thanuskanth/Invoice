const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Package = db.packages;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { package_name } = req.body;


    if (!package_name) {
        return res.status(400).json("fill all fields!")
    };
    const package = new Package(
        { package_name }
    )
    package.save()
    .then(package=>res.json(package))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Package.destroy({where: { id: req.params.id }})
        .then(package => res.json(package))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    const {package_name } = req.body;
    Package.update(req.body,{ where: { id: req.params.id }})
   .then((package)=>res.json(package)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Package.findByPk(req.params.id).then(package => res.json(package))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Package.findAll().then(package =>res.json(package))

        .catch(err => res.status(400).json(err));
})



module.exports = router;