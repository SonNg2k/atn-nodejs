var mongoose = require("mongoose");

var ToySchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: String,
        required: true,
        enum: ["action-figures", "animals", "construction-creative", "dolls", "educational", "electronic", "model-building", "spinning"]
    }
})

module.exports = mongoose.model("Toy", ToySchema)
