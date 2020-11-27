const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Invoice = db.invoicedescription;
// const Invoice = require('../../app/models/invoice.model');
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { description,amount,count,invoice} = req.body;


    if (!description || !amount || !count  || !invoice ) {
        return res.status(400).json("fill all fields!")
    };
    const invoicedec = new Invoice(
        { description,amount,count,invoice }
    )
    invoicedec.save()
    .then(invoice=>res.json(invoice))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Invoice.destroy({where: { id: req.params.id }})
        .then(invoice => res.json(invoice))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    const {invoice_name } = req.body;
    Invoice.update(req.body,{ where: { id: req.params.id }})
   .then((invoice)=>res.json(invoice)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id', auth,(req, res) => {
//   return  Invoice.findAll({where: {
//         invoice: req.params.id
//       }})


    Invoice.findAll({where: {
        invoice: req.params.id
      }}).then(invoice => res.json(invoice))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Invoice.findAll().then(invoice =>res.json(invoice))

        .catch(err => res.status(400).json(err));
})



module.exports = router;