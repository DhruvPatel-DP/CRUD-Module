var express = require('express');
var DB=require('./DB.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app=express();

mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/Node1')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res,next)
{
	DB.find(function (err, data) 
	{
    	if (err) return next(err);
    	res.json(data);
  	});
});


app.get('/:name', function(req,res,next)
{
	DB.find({name : req.params.name},function (err, data) 
	{
    	if (err) return next(err);
    	res.json(data);
  	});
});

app.post('/', function(req,res,next)
{
	DB.create(req.body,function (err, data) 
	{
    	if (err) return next(err);
    	res.json(data);
  	});
});

app.put('/:name', function(req,res,next)
{
	DB.findOneAndUpdate({name : req.params.name},req.body,function (err, data) 
	{
    	if (err) return next(err);
    	res.json(data);
  	});	
});


app.delete('/:ID', function(req,res,next)
{
	DB.findByIdAndRemove(req.params.ID,req.body,function (err, data) 
	{
    	if (err) return next();
    	res.json(data);
  	});		
}, 
function(req,res,next)
{
	DB.findOneAndRemove({name : req.params.ID},req.body,function (err, data) 
	{
    	if (err) return next(err);
    	res.json(data);
  	});
});

var server = app.listen(4000,function(req,res)
{
	console.log('server started successfully');
});
