const express = require('express');
const collections = require('../app/models/collections');
const users = require('../app/models/users');
const router = express.Router();
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwt123'

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

//GET check is favorite item
router.get('/isFavorite/:id', async function (req, res) {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            const item = await users.find({"_id":data.id, "love": req.params.id},             
                async function(err, result) {
                    if (result.length!==0) {
                        return res.json(true)
                    } else {
                        return res.json(false)
                    }
                }
            )
        }
        catch(err){
            res.json({message:"false"})
        }
	});
    
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
