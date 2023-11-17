module.exports = function(app) {
	app.get("/search", function(req, res) {
		let user = require("../user.json").user[0];
		let profile = require("../user.json").profile[0];
		res.render("home", {
			user: user,
			profile: profile,
			content: `<br><h2 style = "color:var(--color-darker)">Search Replit with Ease</h2><form action = "/searched" method = "POST"><input placeholder = "Search Replit…" name = "userInput" autocomplete = "off" style = "vertical-align:middle" required/> <button type = "submit" style = "height:43px; vertical-align:middle;"><i class="fa-solid fa-magnifying-glass"></i> Search</button></form>`,
			page: "Search",
		});
	});
	app.post("/searched", function(req, res) {
		let userInput = req.body.userInput;
		res.redirect(`https://replit.com/search?query=${userInput}`);
	});
}