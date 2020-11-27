const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Invoice = db.invoice;
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { program,package,date,owner,order_id,total,customer_name,nic,address,phonenumber,status} = req.body;


    if (!program || !package || !date  || !owner || !order_id || !total || !customer_name || !nic || !address || !phonenumber|| !status) {
        return res.status(400).json("fill all fields!")
    };
    const invoice = new Invoice(
        {  program,package,date,owner,order_id,total,customer_name,nic,address,phonenumber,status }
    )
    invoice.save()
    .then(invoice=>res.json(invoice))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Invoice.destroy({where: { id: req.params.id }})
        .then(invoice => res.json(invoice))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    Invoice.update(req.body,{ where: { id: req.params.id }})
   .then((invoice)=>res.json(invoice)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {
    // findByPk(req.params.id, { include: ["debit"] });

    Invoice.findByPk(req.params.id, { include: ["debit"] }).then(invoice => res.json(invoice))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Invoice.findAll({ include: ["debit"] }).then(invoice =>res.json(invoice))

        .catch(err => res.status(400).json(err));
})



module.exports = router;