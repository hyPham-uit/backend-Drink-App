const express = require('express');
const collections = require('../app/models/collections');
const router = express.Router();

//get collections
router.get('/', async(req, res, next) => {
    try{
        const item = await collections.find({});
        res.json(item);
    }
    catch(err){
        res.json({message:err})
    }
});

//get collections by id
router.get('/:id', async(req, res, next) => {
    try{
        const item = await collections.find({id: req.params.id });
        res.json(item);
    }
    catch(err){
        res.json({message:err})
    }
});
module.exports = router;
