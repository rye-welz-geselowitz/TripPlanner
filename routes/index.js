var Express=require('express');
var router=Express.Router();
var Promise = require('bluebird');
var models= require('../models');
var Place = models.Place;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

router.get('/',function(req,res,next){
	var hotelPromise=Hotel.findAll({include : [Place]}); //allows us to do hotel.place.<property>
	var restaurantPromise=Restaurant.findAll({include : [Place]});
	var activityPromise=Activity.findAll({include : [Place]});

	Promise.all([hotelPromise,restaurantPromise,activityPromise])
	.spread(function(hotels,restaurants,activities){
		 res.render('index',{hotels:hotels,activities:activities,restaurants:restaurants});
	})
	.catch(next);
});

module.exports=router;
