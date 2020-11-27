const express = require('express');
const router = express.Router();
const db = require("../../app/models");
const auth =require('../../middleware/auth');

const Customer = db.customers;

router.post('/add',auth, (req, res) => {
    const { customer_name,nic,address,phonenumber} = req.body;


    if (!customer_name || !nic || !address || !phonenumber) {
        return res.status(400).json("fill all fields!")
    };
    const customer = new Customer(
        { customer_name,nic,address,phonenumber }
    )
    customer.save()
    .then(customer=>res.json(customer))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Customer.destroy({where: { id: req.params.id }})
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    const {customer_name } = req.body;
    Customer.update(req.body,{ where: { id: req.params.id }})
   .then((customer)=>res.json(customer)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id', (req, res) => {

    Customer.findByPk(req.params.id).then(customer => res.json(customer))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Customer.findAll().then(customer =>res.json(customer))

        .catch(err => res.status(400).json(err));
})



module.exports = router;