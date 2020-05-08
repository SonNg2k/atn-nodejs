var createError = require('http-errors'),
    express = require("express"),
    exphbs = require("express-handlebars"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    favicon = require("serve-favicon"),
    path = require("path"),
    helpers = require("./lib/helpers")

var app = express()

app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + '/views/partials/',
    helpers: helpers
}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.enable("trust proxy");
app.disable('x-powered-by'); // NOT reveal the technology of server (Express.js) to hackers

// configure dotenv
require("dotenv").config({
    path: "main.env"
}) // the .env file MUST be specified

//configure database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ATN-DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
mongoose.set("useCreateIndex", true);
// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
mongoose.set('useFindAndModify', false);

// body-parser doesn't handle multipart bodies, which is what FormData is submitted as. Use multer instead
app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(express.static(__dirname + "/public")); // Serve static resources
app.use(favicon(path.join(__dirname, "/public/images", "favicon.png"))) // Specify the directory of favicon

// make "/path" and "/path/" to be the same
app.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === "/" && req.url.length > 1 && !test)
        res.redirect(301, req.url.slice(0, -1));
    else next();
});

//requiring routes
var routes = require("./routes")
app.use("/", routes);
app.all("*", (req, _res, next) => {
    next(new createError.NotFound(`Page not found. ${req.ip} tried to reach ${req.originalUrl}`))
})

process.on("unhandledRejection", (reason, promise) => {
    //reason is usually the Error object
    console.log("Unhandled Rejection at:", reason.stack || reason)
    /* Recommended: send the information to sentry.io
    or whatever crash reporting service you use */
})

// Error handling
app.use(logErrors);
app.use(errorHandler);

function errorHandler(err, req, res, _next) {
    /*  If you call next() with an error after you have started writing the response (for example, if you
     encounter an error while streaming the response to the client) the Express default error handler
     closes the connection and fails the request. */
    /* So when you add a custom error handler, you must delegate to the default Express error handler, when
    the headers have already been sent to the client: */
    if (res.headersSent) return next(err); // default error handler can get triggered if you call next()
    // with an error in your code more than once, even if custom error handling middleware is in place.

    /*  422 Unprocessable Entity: the server understands the content type of the request entity, and the
   syntax of the request entity is correct, but it was unable to process the contained instructions.
   The server understands what you're trying to do; and it understands the data that you're submitting; it
   simply won't let that data be processed.
   For example: a user is sending a String to an API end point that expects a String, but the server
   couldn't process it because the string contains nothing or several unacceptable characters, etc.*/

    // render the error page
    res.status(err.statusCode || 500).render('error', { error: err });
    // http-errors: mirroring statusCode for general compatibility
}

function logErrors(err, req, res, next) {
    /* Basic console.log will not go through long and complex object, and may
    decide to just print [Object] instead. */
    console.dir(err, { depth: null }); // depth: null allows console.dir() to print mutiple objects at once
    next(err)
}

var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Nodejs app for ATN has fired up!");
});
