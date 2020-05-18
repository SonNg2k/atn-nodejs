var mongoose = require("mongoose")

var InvoiceItemSchema = new mongoose.Schema({
    _toyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toy",
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
        max: 10
    },
    subtotal: {
        type: Number,
        require: true,
        min: 0,
        max: 999999990
    }
})

module.exports = mongoose.model("InvoiceItem", InvoiceItemSchema)
