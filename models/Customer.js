var mongoose = require("mongoose"),
    Invoice = require("./Invoice")

var CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 70,
        unique: true,
        required: true,
        dropDups: true // Drop duplicate records in schema
    },
    dob: {
        type: Date,
        required: true,
        min: '1950-01-01',
        max: '2015-12-31'
    },
    gender: {
        type: String,
        enum: ["female", "male"]
    },
    address: {
        type: String,
        required: true,
        maxlength: 60
    },
    phoneNumb: {
        type: String,
        required: true,
        maxlength: 15
    },
    // A list of invoices from this customer...
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice"
    }]
})

module.exports = mongoose.model("Customer", CustomerSchema)
