var router = require("express").Router({ mergeParams: true }),
    populate = require("./utils/upload-img"), // Populate multipart/form-data
    fs = require("fs"),
    Toy = require("../models/Toy")

router.get("/", (_req, res) => {
    res.render("management", { route: "inventory" })
})

router.post("/", populate.any(), (req, res) => {
    var toy = req.body.toy;
    toy.thumbnail = "/images/uploaded/" + req.files[0].filename;
    Toy.create(toy)
        .then((newToy) => res.status(201).json(newToy))
        .catch((err) => {
            fs.unlink("./" + req.files[0].path, () => { }) // Delete the saved image of the error item
            next(err)
        })
})

router.put("/:toyID", populate.any(), (req, res) => {
    console.log(req.body)
    console.log(req.params.toyID)
})

router.delete("/:toyID", (req, res) => {

})

module.exports = router
