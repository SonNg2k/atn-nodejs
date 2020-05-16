var router = require("express").Router({mergeParams: true}),
    Customer = require("../models/Customer"),
    Toy = require("../models/Toy")


router.get("/", (_req, res, next) => {
    // Get a  a list of customers. One of them might be selected for the invoice
    Promise.all([Customer.find({}).lean(), Toy.find({}).lean()])
    .then((found) => {
        res.render("management", {route: "invoices", clients: found[0], toys: found[1]})
    })
    .catch(next)
})

module.exports = router
