var router = require("express").Router({mergeParams: true})

router.get("/", (_req, res) => {
    res.render("management", {route: "retail-stores"})
})

module.exports = router
