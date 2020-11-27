const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Debitnote = db.debit;
const auth = require('../../middleware/auth');
const Invoice = db.invoice;

router.post('/add',auth, (req, res) => {
    const { invoiceId,balance_due,total} = req.body;


    if ( !balance_due || !invoiceId  ) {
        return res.status(400).json("fill all fields!")
    };
    const debitnote = new Debitnote(
        {  invoiceId,balance_due,total }
    )
    debitnote.save()
    .then(debitnote=>res.json(debitnote))
    .catch(err => res.status(400).json(err));
 });
 router.delete('/:id',auth, (req, res) => {
    Debitnote.destroy({where: { id: req.params.id }})
        .then(debitnote => res.json(debitnote))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    Debitnote.update(req.body,{ where: { id: req.params.id }})
   .then((debitnote)=>res.json(debitnote)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Debitnote.findAll({where: {
        invoiceId: req.params.id
      }}).then( debitnote => res.json(debitnote))
        .catch(err => res.status(400).json(err));
});


router.get('/debit_des/:id', (req, res) => {
    
    Debitnote.findByPk(req.params.id , { include: ["debit"] }).then( debitnote => res.json(debitnote))
        .catch(err => res.status(400).json(err));
});

router.get('/debit/:id',auth, (req, res) => {

    Debitnote.findByPk(req.params.id)
    .then( receipt =>{
        Invoice.findByPk(receipt.invoiceId).then(invoice=>{
            res.json( {
   
                invoice:invoice,
                debit:receipt
            })
        })
      
    })
        
      
        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Debitnote.findAll().then(debitnote =>res.json(debitnote))

        .catch(err => res.status(400).json(err));
})



module.exports = router;