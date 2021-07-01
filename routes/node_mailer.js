const nodemailer = require('nodemailer')

router.post('/sendMail', async (req, res) => {
    let password = Math.floor(Math.random() * 99999999) + 10000000;
    const output = `
        <h3>Giangnam Coffee</h3>
        <p>Chúng tôi đã hỗ trỡ bạn reset mật khẩu. Đây là mật khẩu mới của bạn: <b>${password}</b></p>
        <p>Trân trọng</p>
    `;

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: '18520871@gm.uit.edu.vn', // generated ethereal user
            pass: '1010640608'  // generated ethereal password
        },
        tls:{
        rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Giangnam Coffee" <18520871@gm.uit.edu.vn>', // sender address
        to: `${req.email}`, // list of receivers
        subject: 'Giangnam Coffee - Reset mật khẩu', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({status: 'fail', message:'Gửi mật khẩu mới thất bại. Bạn vui lòng thử lại nhé'});
        }
        res.json({status: 'ok', message:'Mật khẩu mới đã được gửi vào mail của bạn!'});
    });
});

module.exports = router;
