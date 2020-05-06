var router = require("express").Router(),
    uploadImg = require("./utils/upload-img")

router.get("/", (_req, res) => {
    res.render("homepage")
})

router.post("/upload_img", uploadImg.any(), (req, res) => {
    res.json({ location: `/images/uploaded/${req.files[0].filename}` })
})

// Assemble other routes...
router.use("/customers", require("./customers"))
router.use("/invoices", require("./invoices"))
router.use("/inventory", require("./inventory"))

module.exports = router
