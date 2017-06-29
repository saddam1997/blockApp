/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		create: function(req, res, next) {
			console.log("User Create ......");
	    var userObj = {

	      email: req.param('email'),
	      password: req.param('password')
	    }

	    // Create a User with the params sent from
	    // the sign-up form --> new.ejs
	    User.create(userObj, function userCreated(err, user) {

	      // // If there's an error
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
	  },
	  dashboard: function(req, res, next) {

	    User.findOne(req.param('id'), function foundUser(err, user) {//?? This function get data from Database
	      if (err) return next(err);
	      if (!user) return next();
	      res.view({
	        user: user
	      });
	    });
	  }
};
