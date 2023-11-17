const replit = require("replit-graphql");

module.exports = function(app) {
	app.get("/repls", function(req, res) {
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
				if(replCount <= 100 && list.data.userByUsername.publicRepls.items[replCount] != undefined){
					let ti = JSON.stringify(list.data.userByUsername.publicRepls.items[replCount].title).replace(/\"/g, "");
					let des = JSON.stringify(list.data.userByUsername.publicRepls.items[replCount].description).replace(/\"/g, "");
					let url = ti.replace(/\s+/g, '-');
					if(des == "null"){
						des = "";
					}
					repls = `${repls}<a href = "https://replit.com/@${user}/${url}"><div class = "repl">${ti}<br><span style = "color:var(--color-darkest)">${des}</span></div></a>`;
					check();
				}else{
					replCount = 10;
				}
			}
			
			res.render("home", {
				user: user,
				profile: profile,
				content: `<h2 style = "color:var(--color-darker)">My Repls</h2>${repls}`,
				page: "Repls",
			});
		})();
	});
}