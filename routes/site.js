const express = require('express');
const router = express.Router();

//lấy ra newsController
//const siteController = require('../app/controllers/SiteController');

//nên để slug lên trước vì đây là ngôn ngữ script,
//nếu ko lên trước, nó sẽ vào '/' và '/:slug' ko được vào
router.get('/search', siteController.search);
//cấu hình khi vào /news/ sẽ sử dụng function index của newsController
router.get('/', siteController.index);
//router.use('/:slug', newsController.show)

//export ra để index.js trong folder routes có thể import
module.exports = router;
