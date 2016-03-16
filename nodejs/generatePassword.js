var bcrypt = require('bcrypt');

if (process.argv.length == 3){
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(process.argv[2], salt);
	var hashedPassword = { "password" : hash };
	console.log(JSON.stringify(hashedPassword)); 
}
else{
	process.exit(1);
}
