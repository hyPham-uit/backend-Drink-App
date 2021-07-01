//import dotenv from 'dotenv'

const express = require('express');
const router = express.Router();
const User = require('../app/models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jwt123'
const nodemailer = require('nodemailer')

//dotenv.config();


router.post('/login', async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET,
			//process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '3600s'}
		)
		//console.log(data);
		return res.json({ status: 'ok', data:token  })
	}
	res.json({ status: 'error', error: 'Invalid email/password' })
})



router.post('/register', async (req, res) => {
	const {email, username, password: plainTextPassword } = req.body
	const love=[];
	const roles=0;
	const phone='0765517087';
	const address='';

	//kiểm tra username password hợp lệ
	// if (!email || typeof email !== 'string') {
	// 	return res.json({ status: 'error', error: 'Invalid email' })
	// }

	// if (!username || typeof username !== 'string') {
	// 	return res.json({ status: 'error', error: 'Invalid username' })
	// }

	// if (!plainTextPassword || typeof plainTextPassword !== 'string') {
	// 	return res.json({ status: 'error', error: 'Invalid password' })
	// }

	// if (plainTextPassword.length < 5) {
	// 	return res.json({
	// 		status: 'error',
	// 		error: 'Password too small. Should be at least 6 characters'
	// 	})
	// }

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username, email, password, phone, address, love, roles
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Email already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

router.post('/change-password', async (req, res) => {
	const { token, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(token, JWT_SECRET)

		const _id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: ';))' })
	}
})

router.post('/sendMail',checkEmail, async (req, res) => {
	const pass = Math.random().toString(36).slice(-8);
	try {
		
		const password = await bcrypt.hash(pass, 10)

		await User.updateOne(
			{ email: req.body.email },
			{
				$set: { password }
			}
		)
		
		const output = `
			<h3>Giangnam Coffee</h3>
			<p>Chúng tôi đã hỗ trỡ bạn reset mật khẩu. Đây là mật khẩu mới của bạn: <b>${pass}</b></p>
			<p>Trân trọng</p>
    	`;

		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: '18520871@gm.uit.edu.vn', 
				pass: '1010640608' 
			},
		});

		// setup email data with unicode symbols
		let mailOptions = {
			from: '"Giangnam Coffee" <18520871@gm.uit.edu.vn>', 
			to: `${req.body.email}`, // list of receivers
			subject: 'Giangnam Coffee - Reset mật khẩu', 
			//text: output, // plain text body
			html: `${output}` // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.json({status: 'error', message:'Gửi mật khẩu mới thất bại. Bạn vui lòng thử lại nhé'});
			}
			res.json({status: 'ok', message:'Mật khẩu mới đã được gửi vào mail của bạn!'});
		});
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', message: 'Email không đúng. Vui lòng nhập lại' })
	}
});

module.exports = router;

async function checkEmail(req, res, next){
	const {email} = req.body;
	const user = await User.findOne({ email }).lean();
	if (!user) {
		return res.status(403).json({
			success: false,
			message: "Email không tồn tại",
		  });
	}
	next();
}

