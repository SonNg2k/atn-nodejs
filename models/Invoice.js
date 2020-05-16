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
        required: true
    },
    // For the simplicity, each invoice only has one purchased item
    invoiceItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InvoiceItem",
        required: true
    }
})

module.exports = mongoose.model("Invoice", InvoiceSchema)
