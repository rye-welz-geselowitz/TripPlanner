var Express = require('express');
var app = new Express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes=require('./routes');
var swig=require('swig');
var path=require('path');

app.listen(3000,function(){
	console.log("listening at port 3000")
})

app.set('view engine','html');
app.set('views',__dirname+'/views');
app.engine('html',swig.renderFile);
swig.setDefaults({cache:false});

app.use(bodyParser.json());
app.use('/',routes);
app.use(morgan('dev'));

app.use('/bootstrap', Express.static(__dirname+'/node_modules/bootstrap/dist'));
app.use('/jquery', Express.static(__dirname+'/node_modules/jquery/dist'));
app.use(Express.static(__dirname+'/public'));

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err, "Wheeeeeee!");
  res.render("error.html", {error: err.message});
});