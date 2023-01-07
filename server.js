// Load Node modules
//const ejs = require('ejs');
var express = require('express');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('docs'));
// Port website will run on
app.listen(8080);

// *** GET Routes - display pages ***
// Root Route
//app.get('/', function (req, res) {
//    res.render('pages/index');
//});