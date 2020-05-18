var mongoose = require("mongoose")

var InvoiceLineSchema = new mongoose.Schema({
    toy: { // will be populated with extra data related to toy
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

module.exports = mongoose.model("InvoiceLine", InvoiceLineSchema)
