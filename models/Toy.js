var mongoose = require("mongoose");

var ToySchema = new mongoose.Schema({
    thumbnail: {
        type: String
    },
    name: {
        type: String,
        required: true,
        maxlength: 200
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
        enum: ["action_figures", "animals", "construction_creative", "dolls", "educational", "electronic", "model_building", "spinning"]
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Toy", ToySchema)
