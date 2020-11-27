const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Item = db.items;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add',auth, (req, res) => {
    const { item_name,detail,amount } = req.body;


    if (!item_name  || !detail || !amount ) {
        return res.status(400).json("fill all fields!")
    };
    const item = new Item(
        {  item_name,detail,amount  }
    )
    item.save()
    .then(item=>res.json(item))
    .catch(err => res.status(400).json(err));
 });
router.delete('/:id',auth, (req, res) => {
    Item.destroy({where: { id: req.params.id }})
        .then(item => res.json(item))
        .catch(err => res.status(400).json(err));
});

router.post('/:id',auth, (req, res) => {
    const { item_name,detail,amount  } = req.body;
    Item.update(req.body,{ where: { id: req.params.id }})
   .then((item)=>res.json(item)).catch(err =>{ res.status(400).json(err)})

    
});

router.get('/:id',auth, (req, res) => {

    Item.findByPk(req.params.id).then(item => res.json(item))

        .catch(err => res.status(400).json(err));
});

router.get('/',auth, (req, res) => {

    Item.findAll().then(item =>res.json(item))

        .catch(err => res.status(400).json(err));
})



module.exports = router;