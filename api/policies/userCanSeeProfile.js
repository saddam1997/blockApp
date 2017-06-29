/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {



	// The requested id does not match the user's id,
	// and this is not an admin
	console.log(req.session.User.id+" redirect can access "+req.param('id'))
	if (req.session.User.id != req.param('id')) {
		var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}]
		// req.session.flash = {
		// 	err: noRightsError
		// }
		console.log("redirect to Error page")
    res.redirect('/');
    return;
	}

	ok();

};
