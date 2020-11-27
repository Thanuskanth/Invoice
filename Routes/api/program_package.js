const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Program_package = db.program_package;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { program,pac,amount} = req.body;


    if ( !amount || !pac || !program) {
        return res.status(400).json("fill all fields!")
    };
    const customer = new Program_package(
        { program,pac,amount }
    )
    customer.save()
    .then(customer=>res.json(customer))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Program_package.destroy({where: { id: req.params.id }})
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    const {customer_name } = req.body;
    Program_package.update(req.body,{ where: { id: req.params.id }})
   .then((customer)=>res.json(customer)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Program_package.findByPk(req.params.id).then(customer => res.json({ 
        id:customer.id,
        pac:customer.package,
        program:customer.program,
        amount:customer.amount}))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Program_package.findAll().then(customer =>res.json(customer))

        .catch(err => res.status(400).json(err));
})



module.exports = router;