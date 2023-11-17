const replit = require("replit-graphql");

module.exports = function(app) {
	app.get("/", function(req, res) {
		let user = require("../user.json").user[0];
		let profile = require("../user.json").profile[0];
		let repls = [];
		let replCount = -1;
		(async () => {
			const query = `
	 		query User($username: String!) {
 	 			userByUsername(username: $username) {
    			publicRepls(count: 100) {
      			items {
        			id
        			title
        			description
      			}
    			}
  			}
	 		}`;
			const variables = {"username": user};
			
			let list = await replit.query(query, { variables });

			check();
			function check(){
				replCount+=1;
				if(replCount <= 2){
					let ti = JSON.stringify(list.data.userByUsername.publicRepls.items[replCount].title).replace(/\"/g, "");
					let des = JSON.stringify(list.data.userByUsername.publicRepls.items[replCount].description).replace(/\"/g, "");
					let url = ti.replace(/\s+/g, '-');
					if(des == "null"){
						des = "";
					}
					repls = `${repls}<a href = "https://replit.com/@${user}/${url}"><div class = "repl" style = "max-width:600px;">${ti}&nbsp;&nbsp;<span style = "color:var(--color-darkest)">${des}</span></div></a>`;
					check();
				}
			}
			res.render("home", {
				user: user,
				profile: profile,
				content: `<h2 style = "color:var(--color-darker)">Recent</h2>${repls}<br><h2 style = "color:var(--color-darker)">Followers</h2><h3 style = "text-align:center; color: #D9544D">COMING SOON!</h3>`,
				page: "Home",
			});
		})();
	});
}