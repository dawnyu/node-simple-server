var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    autoRoutes = require('express-auto-routes'),
    server = require('./server');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var routes = autoRoutes(app);
app.use(server);
app.use(function(req, res, next) {
    res.status(404);
    next({ _code: 404, _msg: 'Page not found' });
});
app.use(function(err, req, res, next) {
    console.error(err);

    if (err._status) res.status(err._status);

    res.json({
        _code: err._code || 1,
        _msg: err._msg || err
    });
});
var server;
if (!module.parent) {
    var PORT = 8989;
    console.log('[INFO] Msg board RESTful API listening at localhost:%s', PORT);
    server = app.listen(PORT);
} else {
    module.exports = app;
}