var router = require("express").Router({ mergeParams: true }),
    populate = require("./utils/upload-img"), // Populate multipart/form-data
    Customer = require("../models/Customer")

router.get("/", (_req, res, next) => {
    Customer.find({}).lean()
        .then((foundClients) => res.render("management", { route: "customers", clients: foundClients }))
        .catch(next)
})

router.post("/", populate.any(), (req, res, next) => {
    var customer = req.body.customer
    Customer.create(customer)
        .then((newClient) => res.status(201).json(newClient))
        .catch(next)
})

module.exports = router
