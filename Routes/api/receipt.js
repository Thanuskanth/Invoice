const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Receipt = db.receipt;
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const {invoice_id,for_payment_of,amount,from,payment_method,remark} = req.body;

   
    if (!for_payment_of || !amount || !from  || !payment_method ) {
        return res.status(400).json("fill all fields!")
    };
    const receipt = new Receipt(
        {  invoice_id,for_payment_of,amount,from,payment_method,remark }
    )
    receipt.save()
    .then(receipt=>res.json(receipt))
    .catch(err => res.status(400).json(err));
 });
 router.delete('/:id',auth, (req, res) => {
    Receipt.destroy({where: { id: req.params.id }})
        .then(receipt => res.json(receipt))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    Receipt.update(req.body,{ where: { id: req.params.id }})
   .then((receipt)=>res.json(receipt)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Receipt.findAll({where: {
        invoice_id: req.params.id
      }}).then( receipt => res.json(receipt))
        .catch(err => res.status(400).json(err));
});

router.get('/receipt/:id',auth, (req, res) => {

    Receipt.findByPk(req.params.id)
    .then( receipt => res.json(receipt))
        .catch(err => res.status(400).json(err));
});

router.get('/', (req, res) => {

    Receipt.findAll().then(receipt =>res.json(receipt))

        .catch(err => res.status(400).json(err));
})



module.exports = router;