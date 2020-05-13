var mongoose = require("mongoose")

var InvoiceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        min: '1950-01-01',
        max: '2015-12-31'
    },
    total: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    // A collection of purchased items...
    details: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "InvoiceItem"
    }]
})

module.exports = mongoose.model("Invoice", InvoiceSchema)
