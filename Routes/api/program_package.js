const express = require('express');
const router = express.Router();
const db = require("../../app/models");

const Program_package = db.program_package;
// const User = require('../../Models/UserModel');
const auth = require('../../middleware/auth');

router.post('/add', auth, (req, res) => {
    const { programId, packageId, amount, items, ownerId ,service} = req.body;


    if (!amount || !packageId || !programId || !items || !ownerId) {
        return res.status(400).json("fill all fields!")
    };
    const program_package = new Program_package(
        { programId, packageId, amount, items, ownerId,service }
    )
    program_package.save()
        .then(program_package => {
            Program_package.findByPk(program_package.id, { include:  ["owners","programs","packages"] }).then(invoice => res.json(invoice))


        }

        )
        .catch(err => res.status(400).json(err));
});
router.delete('/:id', auth, (req, res) => {
    Program_package.destroy({ where: { id: req.params.id } })
        .then(program_package => res.json(program_package))
        .catch(err => res.status(400).json(err));
});

router.post('/:id', auth, (req, res) => {
    Program_package.update(req.body, { where: { id: req.params.id } })
        .then(pac=>{

            Program_package.findByPk(req.params.id, { include:  ["owners","programs","packages"]}).then(program_package => res.json(program_package))
        })
            .catch(err => { res.status(400).json(err) })


});

router.get('/:id', auth, (req, res) => {

    Program_package.findByPk(req.params.id, { include:  ["owners","programs","packages"] }).then(program_package => res.json(program_package
        // {
        //     id: program_package.id,
        //     pac: program_package.package,
        //     program: program_package.program,
        //     amount: program_package.amount
        // }

    ))

        .catch(err => res.status(400).json(err));
});

router.get('/', auth, (req, res) => {

    Program_package.findAll({ include: ["owners","programs","packages"] }).then(program_package => res.json(program_package))

        .catch(err => res.status(400).json(err));
})



module.exports = router;