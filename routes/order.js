const express = require('express');
const router = express.Router();
const orders = require('../app/models/orders');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwt123'

//GET all orders
router.get('/', async(req, res) => {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try{
            const item = await orders.find({customerId: data.id})
            .populate({
                path: "items._id",
                select: "name imageUrl"
              })
            res.json(item);
        }
        catch(err){
            res.json({message:err})
        }
	});
});

//POST create cart
router.post('/create', async(req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	jwt.verify(token, JWT_SECRET, async(err, data) => {
        try {
            //const {totalCost, item } = req.body
            //console.log(...req.body)
            const status = 0;
            const customerId = data.id
            const response = await orders.create({
                customerId, status, ...req.body
            })
            return res.json({status: true})
            //console.log(item)
        } catch (error) {
            throw error
        }
	});
});

//GET lấy giỏ hàng hiện tại
// router.get('/cart', async(req, res, next) => {
//     const authorizationHeader = req.headers['authorization'];
// 	// 'Beaer [token]'
// 	const token = authorizationHeader.split(' ')[1];
// 	jwt.verify(token, JWT_SECRET, async(err, data) => {
//         try{
//             const item = await orders.find({status: req.params.status, customerId: data.id})
//             res.json(item);
//         }
//         catch(err){
//             res.json({message:err})
//         }
// 	});
// });

//thêm sản phẩm vào giỏ hàng
// router.patch('/addCollection/:idCollection', async (req, res) => {
//     const authorizationHeader = req.headers['authorization'];
// 	// 'Beaer [token]'
// 	const token = authorizationHeader.split(' ')[1];
// 	jwt.verify(token, JWT_SECRET, async(err, data) => {
//         try {
//             const item = await orders.find({status: req.params.status, customerId: data.id})
//             item.items.push(req.params.idCollection);
//             item.save();
//             return res.json({status:"ok"})
//           } catch (err) {
//             return res.json({message:err})
//           }
// 	});
    
//   });

// //PUT change cart to order
// router.put('/ordering', async(req, res, next) => {
//     const authorizationHeader = req.headers['authorization'];
// 	// 'Beaer [token]'
// 	const token = authorizationHeader.split(' ')[1];
// 	jwt.verify(token, JWT_SECRET, async(err, data) => {
//         try{
//             const item = await orders.findById(req.params._id)
//             if (item) {
//                 item.status=data.status;
//                 item.save();
//               }
//         }
//         catch(err){
//             res.json({message:err})
//         }
// 	});
// });


module.exports = router;
