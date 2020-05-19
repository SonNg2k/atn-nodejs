var router = require("express").Router({ mergeParams: true }),
    populate = require("./utils/upload-img"),
    Customer = require("../models/Customer"),
    Toy = require("../models/Toy"),
    Invoice = require("../models/Invoice"),
    InvoiceLine = require("../models/InvoiceLine")


router.get("/", (_req, res, next) => {
    // Get a  a list of customers. One of them might be selected for the invoice
    Promise.all([Customer.find({}).lean(), Toy.find({}).lean(),
    Invoice.find({}).populate("customer", "-invoices").populate({
        path: "invoiceLine", // Each invoice has a property 'invoiceLine' pointing to the InvoiceLine model
        populate: { // Each invoiceLine document has a property 'toy' pointing to the Toy model
            path: "toy",
            model: "Toy"
        }
    }).lean()])
        .then((found) => {
            res.render("management", { route: "invoices", clients: found[0], toys: found[1], invoices: found[2] })
        })
        .catch(next)
})

router.post("/", populate.any(), async (req, res, next) => {
    var invoice = req.body.invoice,
        invoiceLine = req.body.invoiceLine
    try {
        invoiceLine = await InvoiceLine.create(invoiceLine) // First try to create an invoice
        // If the given invoice is created successfully, it means that the given invoice's item is valid
        // Add values to the following properties of the invoice
        invoice.total = invoiceLine.subtotal
        invoice.invoiceLine = invoiceLine._id

        // Then create the invoice...
        invoice = await Invoice.create(invoice)
        // Populate data to the properties of type mongoose.Schema.Types.ObjectId...
        invoice = await invoice.populate("customer", "-invoices").populate("invoiceLine").execPopulate()

        // Find the toy included in the invoice...
        var includedToy = await Toy.findById(req.body.invoiceLine.toy, "name").lean()

        // Then add the name and price of the toy...
        invoice.invoiceLine._doc.name = includedToy.name; // ._doc is the actual data returned to client
        res.status(201).json(invoice)
    } catch (e) {
        next(e)
    }
})

router.put("/:invoiceID", populate.any(), async (req, res, next) => {
    var newDate = req.body.invoice.date
    try {
        // 1) Create a new InvoiceLine document, which will then be assigned to the existing Invoice document
        var newLineItem = await InvoiceLine.create(req.body.invoiceLine)
        newLineItem = await newLineItem.populate("toy").execPopulate()

        // 2) Update the invoice with the given ID
        var newInvoice = {
            date: newDate,
            total: newLineItem.subtotal,
            invoiceLine: newLineItem._id
        }
        var foundInvoice = await Invoice.findByIdAndUpdate(req.params.invoiceID, newInvoice).lean()
        await InvoiceLine.findByIdAndDelete(foundInvoice.invoiceLine)

        // 3) Return data to client
        newInvoice.invoiceLine = newLineItem
        res.status(201).json(newInvoice)
    } catch (e) {
        next(e)
    }
})

router.delete("/:invoiceID", async (req, res, next) => {
    try {
        // First find the invoice
        var foundInvoice = await Invoice.findByIdAndDelete(req.params.invoiceID).lean()
        await InvoiceLine.findByIdAndDelete(foundInvoice.invoiceLine)
        res.status(201).json("success")
    } catch (e) {
        next(e)
    }
})

module.exports = router
