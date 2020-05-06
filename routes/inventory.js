var router = require("express").Router({ mergeParams: true }),
    populate = require("./utils/upload-img"), // Populate multipart/form-data
    fs = require("fs"),
    Toy = require("../models/Toy")

router.get("/", (_req, res, next) => {
    Toy.find({}).lean()
        .then((foundToys) => res.render("management", { route: "inventory", toys: foundToys }))
        .catch(next)
})

router.post("/", populate.any(), (req, res, next) => {
    var toy = req.body.toy;
    if (req.files.length === 1) toy.thumbnail = "/images/uploaded/" + req.files[0].filename;
    Toy.create(toy)
        .then((newToy) => res.status(201).json(newToy))
        .catch((err) => {
            if (req.files.length === 1) fs.unlink("./" + req.files[0].path, () => { }) // Delete the saved image of the error item
            next(err)
        })
})

router.put("/:toyID", populate.any(), (req, res, next) => {
    var toy = req.body.toy
    if (req.files.length === 1) toy.thumbnail = "/images/uploaded/" + req.files[0].filename;
    Toy.findByIdAndUpdate(req.params.toyID, toy, { new: true, omitUndefined: true }).lean()
        .then((updated) => res.status(201).json(updated))
        .catch((err) => {
            if (req.files.length === 1) fs.unlink("./" + req.files[0].path, () => { }) // Delete the saved image of the error item
            next(err)
        })
})

router.delete("/:toyID", (req, res, next) => {
    Toy.findByIdAndDelete(req.params.toyID).lean()
    .then((deleted) => {
        res.status(201).json("success")
        fs.unlink(`./public${deleted.thumbnail}`, () => {}) // delete thumbnail of deleted item
    })
    .catch(next)
})

module.exports = router
