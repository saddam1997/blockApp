/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res, next) {

    console.log(req.param('email')+ "  create.........................   "+req.param('password'));
    // Check for email and password in params sent via the form, if none
    // redirect the browser back to the sign-in form.
    if (!req.param('email') || !req.param('password')) {
      // return next({err: ["Password doesn't match password confirmation."]});

      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'You must enter both a username and password.'
      }]

      // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
      // the key of usernamePasswordRequiredError
      // req.session.flash = {
      //   err: usernamePasswordRequiredError
      // }
			console.log("create....usernamePasswordRequiredError.....................");
      res.redirect('/signin');
      return;
    }

    // Try to find the user by there email address.
    // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
    // User.findOneByEmail(req.param('email')).done(function(err, user) {
    User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			console.log("create....findOneByEmail.....................");
      if (err) return next(err);
			//console.log("create....findOneByEmail not error....................."+user.id);
      // If no user is found...
      if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address ' + req.param('email') + ' not found.'
        }]
        // req.session.flash = {
        //   err: noAccountError
        // }
				console.log("create....findOneByEmail User Not found.....................");
        res.redirect('/signin');
        console.log("User Not found");
        return;
      }
			var passworddetails=req.param('password');
			console.log(user.password==passworddetails);
      if (req.param('password') != user.password) {
				res.redirect('/signin');
				console.log("email and password miss match found");
				return;
      }
			if (req.param('password') == user.password) {
         req.session.authenticated = true;
				 console.log("create....findOneByEmail req.session.authenticated = true.....................");
        req.session.User = user;
        res.redirect('/user/dashboard/' + req.session.User.id);
      }



      // Compare password from the form params to the encrypted password of the user found.
   /*   bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatch',
            message: 'Invalid username and password combination.'
          }]
          req.session.flash = {
            err: usernamePasswordMismatchError
          }
          res.redirect('/session/new');
          return;
        }

        // Log user in
        req.session.authenticated = true;
        req.session.User = user;
        res.redirect('/user/show/' + user.id);
        // Change status to online
        user.online = true;
        user.save(function(err, user) {
          if (err) return next(err);

          // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          User.publishUpdate(user.id, {
            loggedIn: true,
            id: user.id,
            name: user.name,
            action: ' has logged in.'
          });

          // If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
          // This is used in conjunction with config/policies.js file
          if (req.session.User.admin) {
            res.redirect('/user');
            return;
          }

          //Redirect to their profile page (e.g. /views/user/show.ejs)
          res.redirect('/user/show/' + user.id);
        });
      });*/
    });
  },

  destroy: function(req, res, next) {




        // Wipe out the session (log out)
				console.log("session destroy.....................");
        req.session.destroy();
				 //$(".noty_info").show();

        // Redirect the browser to the sign-in screen
        res.redirect('/');


  }

};
