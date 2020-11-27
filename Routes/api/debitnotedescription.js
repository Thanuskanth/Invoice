const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const DebitDescription = db.debit_description;
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { debitnoteId,amount,description} = req.body;


    if ( !debitnoteId || !amount || !description ) {
        return res.status(400).json("fill all fields!")
    };
    const debit_description = new DebitDescription(
        { debitnoteId,amount,description }
    )
    debit_description.save()
    .then(debit_description=>res.json(debit_description))
    .catch(err => res.status(400).json(err));
 });
 router.delete('/:id',auth, (req, res) => {
    DebitDescription.destroy({where: { id: req.params.id }})
        .then(debit_description => res.json(debit_description))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    DebitDescription.update(req.body,{ where: { id: req.params.id }})
   .then((debit_description)=>res.json(debit_description)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    findByPk(req.params.id, { include: ["debit"] });

    // DebitDescription.findAll({where: {
    //     debitnoteId: req.params.id
    //   }}).then( debit_description => res.json(debit_description))
    //     .catch(err => res.status(400).json(err));
});
router.get('/debit/:id',auth, (req, res) => {

    // findByPk(req.params.id, { include: ["debit"] });

    DebitDescription.findAll({where: {
        debitnoteId: req.params.id
      }}).then( debit_description => res.json(debit_description))
        .catch(err => res.status(400).json(err));
});
router.get('/', (req, res) => {

    DebitDescription.findAll().then(debit_description =>res.json(debit_description))

        .catch(err => res.status(400).json(err));
})



module.exports = router;