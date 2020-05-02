var router = require("express").Router()

router.get("/", (_req, res) => {
    res.render("homepage")
})

// Assemble other routes...
router.use("/customers", require("./customers"))
router.use("/invoices", require("./invoices"))
router.use("/retail-stores", require("./retail-stores"))
router.use("/inventory", require("./inventory"))

module.exports = router
