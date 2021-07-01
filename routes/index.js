//nạp file news vào để cấu hình route news
const categoryRouter = require('./category');
const collectionRouter = require('./collection');
const userRouter = require('./user');
const authRouter = require('./auth');
const orderRouter = require('./order');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwt123'

function route(app) {
    //route tới page news
    app.use('/category', categoryRouter);

    //route tới courses
    app.use('/collection', collectionRouter);

    app.use('/user', authenToken, userRouter);
    app.use('/order', authenToken, orderRouter);
    app.use('/auth', authRouter);

    //phần search
    app.post('/search', (req, res) => {
        console.log(req.body.q);
        res.json(req.body); // gọi giao diện homapage
    });
}

function authenToken(req, res, next) {
	const authorizationHeader = req.headers['authorization'];
	// 'Beaer [token]'
	const token = authorizationHeader.split(' ')[1];
	if (!token) res.sendStatus(401);
  
	jwt.verify(token, JWT_SECRET, (err, data) => {
	  console.log(err, data);
	  if (err) res.status(403).json({
        success: false,
        message: "Session has expried, please login again!",
      });
    next();
	});
}

module.exports = route;
