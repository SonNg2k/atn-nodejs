var router = require("express").Router({mergeParams: true})

router.get("/", (_req, res) => {
    res.render("management", {route: "invoices"})
})

module.exports = router
