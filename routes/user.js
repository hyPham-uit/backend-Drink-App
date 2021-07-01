const express = require('express');
const router = express.Router();
const users = require('../app/models/users');
const orders = require('../app/models/orders');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwt123'

//GET profile
router.get('/', getProfile);

//GET favorite drinks
router.get('/favorite', getFavorite);

//POST change information
router.post('/update', updateUser)

//POST add favorite
router.post('/addFavorite/:id', addFavorite)

//POST add favorite
router.post('/delFavorite/:id', delFavorite)

async function getProfile(req, res) {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            const item = await users.findById(data.id);
            res.json(item);
        }
        catch(err){
            res.json({message:err})
        }
	});
}

async function getFavorite (req, res, next) {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            const item = await users.findById(data.id)
            .populate({
                path: "love",
                select: "_id id name imageUrl price rating sizes"
              })
            res.json(item);
        }
        catch(err){
            res.json({message:err})
        }
	});
    
}

async function updateUser (req, res) {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            let updatedUser = await users.findById(data.id);
            if (updatedUser) {
                updatedUser.username=req.body.username;
                updatedUser.phone = req.body.phone;
                updatedUser.address = req.body.address;

                updatedUser.save();
            }
            return res.json({status: true})
        }
        catch(err){
            res.json({message:err})
        }
	});
}

async function addFavorite (req, res) {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            let updatedUser = await users.find({"_id":data.id, "love": req.params.id},
            async function(err, result) {
                if (result.length!==0) {
                  delFavorite(req, res)
                } else {
                    let user = await users.findById(data.id)
                    user.love.push(req.params.id);
                    user.save();
                    return res.json("Insert success")
                }
              });
        }
        catch(err){
            res.json({message:"Lỗi"})
        }
	});
}

async function delFavorite (req, res) {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            let updatedUser = await users.findById(data.id);
            if (updatedUser) {
                updatedUser.love.pull(req.params.id);
                updatedUser.save();
            }
            //return res.json({status: 'ok'})
            return res.json("Delete succes")
        }
        catch(err){
            res.json({message:err})
        }
	});
}

module.exports = router;
