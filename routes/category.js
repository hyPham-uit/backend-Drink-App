const express = require('express');
const router = express.Router();
const categories = require('../app/models/categories');


router.get('/', async(req, res, next) => {
    try{
        const item = await categories.find({});
        res.json(item);
    }
    catch(err){
        res.json({message:err})
    }
});

module.exports = router;
