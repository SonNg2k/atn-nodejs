var mongoose = require("mongoose")

var InvoiceItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toy"
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
        max: 10
    },
    total: {
        type: Number,
        require: true,
        min: 0,
        max: 999999990
    }
})

module.exports = mongoose.model("InvoiceItem", InvoiceItemSchema)
