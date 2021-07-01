//this file contained method to change object mongoose to literal object (use when render object to .hbs)
module.exports = {
    multipleMongooseToObject: function (mongoose) {
        return mongoose.map((object) => object.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
