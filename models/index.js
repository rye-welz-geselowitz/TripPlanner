var Sequelize=require('sequelize');
var db=require('../db');

var Place = db.define('place', {
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.ARRAY(Sequelize.FLOAT), //[lat,long]
			validate: {
				len:2
			}                    
        }
});


var Activity = db.define('activity', {
        name: {
            type: Sequelize.STRING
        },
        age_range: {
            type: Sequelize.STRING
        }
			
});

var Hotel = db.define('hotel', {
        name: {
            type: Sequelize.STRING
        },
        num_stars: {
            type: Sequelize.INTEGER, //between 1 and 5
			validate: {
				max: 5,
				min: 1
			}
        },
        amenities: {
            type: Sequelize.STRING
        }
});


var Restaurant = db.define('restaurant', {
        name: {
            type: Sequelize.STRING
        },
        cuisine: {
            type: Sequelize.STRING //[comma-delineated tring list]
        },
        price: {
            type: Sequelize.INTEGER, //between 1 and 5 for how many dollar signs
			validate: {
				max: 5,
				min: 1
			}
        }
});

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports= {
	Place: Place,
	Activity: Activity,
	Hotel: Hotel,
	Restaurant: Restaurant
};
