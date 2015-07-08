var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


function restrict(req, res, next) {
    if (req.cookies.alcname) {
        next();
    } else {
        res.redirect('/');
    }
}

//Basic Routing
app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/keycheck', function (req,res) {
    res.redirect('/');
});
app.post('/keycheck', routes.user);
app.get('/home',restrict,routes.home);

//Pages Routing
app.get('/entity',restrict,routes.entity);
app.get('/keyword',restrict,routes.keyword);
app.get('/concept',restrict,routes.concept);
app.get('/sentiment',restrict,routes.sentiment);
app.get('/textext',restrict,routes.textext);
app.get('/author',restrict,routes.author);
app.get('/language',restrict,routes.language);
app.get('/title',restrict,routes.title);
app.get('/relation',restrict,routes.relation);
app.get('/textcat',restrict,routes.textcat);
app.get('/feed',restrict,routes.feed);
app.get('/microformats',restrict,routes.microformats);
app.get('/taxonomy',restrict,routes.taxonomy);
//app.get('/image',restrict,routes.image);
//app.get('/imagekey',restrict,routes.imagekey);
app.get('/combined',restrict,routes.combined);
//app.get('/face',restrict,routes.face);


//API call Routing
app.post('/entity_call',restrict,routes.entity_call);
app.post('/keyword_call',restrict,routes.keyword_call);
app.post('/concept_call',restrict,routes.concept_call);
app.post('/sentiment_call',restrict,routes.sentiment_call);
app.post('/textext_call',restrict,routes.textext_call);
app.post('/author_call',restrict,routes.author_call);
app.post('/language_call',restrict,routes.language_call);
app.post('/title_call',restrict,routes.title_call);
app.post('/relation_call',restrict,routes.relation_call);
app.post('/textcat_call',restrict,routes.textcat_call);
app.post('/feed_call',restrict,routes.feed_call);
app.post('/microformats_call',restrict,routes.microformats_call);
app.post('/taxonomy_call',restrict,routes.taxonomy_call);
//app.post('/image_call',restrict,routes.image_call);
//app.post('/imagekey_call',restrict,routes.imagekey_call);
app.post('/combined_call',restrict,routes.combined_call);
//app.post('/face_call',restrict,routes.face_call);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message, error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message, error: {}
    });
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('IBM app Running at http://%s:%s', host, port);
    console.log('To view the example, point your favorite browser to: localhost:3000');

});

module.exports = app;
