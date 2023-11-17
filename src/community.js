module.exports = function(app) {
	app.get("/community", function(req, res) {
		let user = require("../user.json").user[0];
		let profile = require("../user.json").profile[0];
		res.render("home", {
			user: user,
			profile: profile,
			content: `<p>community page…</p>`,
			page: "Community",
		});
    });
}