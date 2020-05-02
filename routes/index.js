var router = require("express").Router()

router.get("/", (_req, res) => {
    res.render("homepage")
})

// Assemble other routes...

module.exports = router
