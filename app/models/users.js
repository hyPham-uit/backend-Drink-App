var mongoose = require('mongoose');

var users = new mongoose.Schema({
  username: {
    required: true,  unique: true,
    type: String,
  },
  email: {
    required: true,
    type: String,  unique: true
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    type: String
  },
  address: {
    type: String,
  },  
  orders: [ 
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "orders" //_id
    }
  ],
  love: [ 
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "collections"
    }
  ],
  roles: {
    type: Number
  },
})
module.exports = mongoose.model('users', users);
