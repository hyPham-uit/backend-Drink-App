const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://projectMobile:12345@cluster0.htzgl.mongodb.net/OrderDrinks?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure!');
    }
}

module.exports = { connect };
