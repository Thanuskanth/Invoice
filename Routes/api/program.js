const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Program = db.programs;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { program_name } = req.body;


    if (!program_name) {
        return res.status(400).json("fill all fields!")
    };
    const program = new Program(
        { program_name }
    )
    program.save()
    .then(program=>res.json(program))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Program.destroy({where: { id: req.params.id }})
        .then(program => res.json(program))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    const {program_name } = req.body;
    Program.update(req.body,{ where: { id: req.params.id }})
   .then((program)=>res.json(program)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Program.findByPk(req.params.id).then(program => res.json(program))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Program.findAll().then(program =>res.json(program))

        .catch(err => res.status(400).json(err));
})



module.exports = router;