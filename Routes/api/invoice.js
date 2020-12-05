const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Invoice = db.invoice;
const auth = require('../../middleware/auth');

router.post('/add', (req, res) => {
    const { programId,packageId,date,ownerId,order_id,total,customerId,status} = req.body;


    if (!programId || !packageId || !date  || !ownerId || !order_id  || !customerId || !status) {
        return res.status(400).json("fill all fields!")
    };
    const invoice = new Invoice(
        {  programId,packageId,date,ownerId,order_id,total,customerId,status }
    )
    invoice.save()

    .then(invoice=>{
        Invoice.findByPk(invoice.id, { include:  ["owners","programs","packages","customers"] }).then(invoice => res.json(invoice))

    })
        
         
       
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Invoice.destroy({where: { id: req.params.id }})
        .then(invoice => res.json(invoice))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    Invoice.update(req.body,{ where: { id: req.params.id }})
   .then(
       (invoice)=>
       Invoice.findByPk(req.params.id, { include: ["owners","programs","packages","customers"] }).then(invoice => res.json(invoice))

       ).catch(err =>{ res.status(400).json(err)})

    
}); 

router.get('/:id', (req, res) => {
    // findByPk(req.params.id, { include: ["debit"] });

    Invoice.findByPk(req.params.id, { include: ["owners","programs","packages","customers","debit","invoice_description"] }).then(invoice => res.json(invoice))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Invoice.findAll({ include: ["owners","programs","packages","customers"] }).then(invoice =>res.json(invoice))

        .catch(err => res.status(400).json(err));
})



module.exports = router;