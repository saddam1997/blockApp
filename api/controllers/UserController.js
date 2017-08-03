/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bitcoin = require('bitcoin');

module.exports = {

		create: function(req, res, next) {


			console.log("Creating new address ..................... ");

			var client = new bitcoin.Client({
			 host: 'localhost',
			 port: 8332,
			 user: 'test',
			 pass: 'test',
			 timeout: 30000
		 });
			var batch = [];
			for (var i = 0; i < 1; ++i) {
				batch.push({
					method: 'getnewaddress',
					params: [req.param('email')]
				});
			}
			client.cmd(batch, function(err, newCreateAddress, resHeaders) {
				if (err) return console.log(err);
				console.log("User Create ......");
				var newUserAddressDetails ={
					label:"default",
					userAddress:newCreateAddress
				}
				var userObj = {
					email: req.param('email'),
					password: req.param('password'),
					userAddresses: newUserAddressDetails
				}

				User.create(userObj, function userCreated(err, user) {
					 if (err){
								console.log("User Create err..............");
								console.log(err);
									// 	req.session.flash={
									//  		err: err
									// 	}
								return res.json(err);
					 }
						User.publishCreate(user);
						console.log("User Create Succesfully......");
						res.json(user);
				});


	    });
	  },
	  dashboard: function(req, res, next) {
	    // User.findOne(req.param('id'), function foundUser(err, user)
			// {//?? This function get data from Database
	    //   if (err) return next(err);
	    //   if (!user) return next();
			// 	console.log("user balance :"+user.balance);
	    //   res.view({
	    //     user: user
	    //   });
	    // });


			User
			.findOne(req.param('id'))
			.populateAll()
			.then(function (user){
				  res.view({
			     user: user
			   });
			})
			.catch(function (err){
				if (err) return res.serverError(err);
			});
	  },
		createNewAddressApi: function(req, res, next) {

/// get email from session....


				console.log("createNewAddressApi called........."+req.session.User.email);
				var client = new bitcoin.Client({
				 host: 'localhost',
				 port: 8332,
				 user: 'test',
				 pass: 'test',
				 timeout: 30000
			 });
				var batch = [];
				for (var i = 0; i < 1; ++i) {
					batch.push({
						method: 'getnewaddress',
						params: [req.session.User.email]
					});
				}
				client.cmd(batch, function(err, newCreateAddress, resHeaders) {
					if (err) return console.log(err);
					var userAddressesObj={
						label:"NewCreated",
						user:req.session.User.id,
						userAddress:newCreateAddress
					}

					UserAddresses.create(userAddressesObj, function userAddCreated(err, userAddresses) {
							 if (err){
										console.log("User Create err..............");
										console.log(err);
											// 	req.session.flash={
											//  		err: err
											// 	}
										return res.json(err);
							 }
							 UserAddresses.publishCreate(userAddresses);
							 console.log("User Create Succesfully......");
							 res.json(userAddresses);
					});


				});
	  }
};
