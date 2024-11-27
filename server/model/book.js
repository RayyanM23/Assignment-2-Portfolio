const mongoose = require("mongoose");

let bookModel = mongoose.Schema({
    Name: String,
    Author: String,
    Published: String,
    Description: String,
    Price: String
},
{
    collection:"Books"
});
module.exports = mongoose.model('book',bookModel);
