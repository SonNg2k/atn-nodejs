var multer = require("multer"),
    fs = require("fs"),
    createError = require('http-errors')

// If no file is submitted, multer do nothing
// configure multer
var storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        // Path is relative to the current working directory process. cwd()
        cb(null, "./public/images/uploaded") /* passing the file path with forward slashes instead to avoid error */
    },
    filename: (_req, file, cb) => {
        var fileName = file.originalname;
        if (fs.existsSync(`./public/images/uploaded/${fileName}`)) { // If there is already a file with the same name
            var result = fileName.split(".");
            var diffrence = Math.random().toString(36).substring(2, 8);
            result[0] += `.${diffrence}`;
            fileName = `${result[0]}.${result[1]}`;
        }
        cb(null, fileName); // Otherwise, save the image with the original name
    }
})

var imageValidator = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i))
        return cb(createError(422, "Only image is allowed"), false)
    cb(null, true)
}

module.exports = multer({ storage: storage, fileFilter: imageValidator, limits: { files: 1 } })
