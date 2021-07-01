var mongoose = require('mongoose');

var orders = new mongoose.Schema({
  customerId: {//id khách hàng
    required: true,
    type:  mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
	status: {//tình trạng đơn hàng
    required: true,
    type: Number,
  },
  name: { //tổng hóa đơn
    type: String
  },
  phone: { //tổng hóa đơn
    type: String
  },
  address: { //tổng hóa đơn
    type: String
  },
	totalCost: { //tổng hóa đơn
    type: Number
  },
	items: [ //các sản phẩm trong giỏ hàng
    {
      _id: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "collections"
      },
      quantity: {
        type: Number,
      },
      size: {
        type: String,
      }
    }
  ],
},{
  timestamps: true, //create and set attribute timeCreate and timeUpdate in document
})
module.exports = mongoose.model('orders', orders);
