const mongoose = require("mongoose");

require("dotenv").config();

const dbconect = () => {
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})          
		.then(() => {
			console.log("DB connect hogya hai");
		})

		.catch((err) => {
			console.log("Kuch Server problem hai brother");
			console.error(err.message);
			process.exit(1);
		});
};


module.exports = dbconect ; 