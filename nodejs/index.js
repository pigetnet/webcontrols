
//Web rest api
var restify = require('restify');

//Commands
var sys = require('sys');
var exec = require('child_process').exec;

//File management
var fs = require('fs');
var os = require('os');
var path = require('path');

var stripAnsi = require('strip-ansi');

//Password management
var bcrypt = require('bcrypt');
var util = require('util');


config_dir = "/user/config/webcontrols/";

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function readConfig(){
	var obj = JSON.parse(fs.readFileSync(config_dir + 'webcontrols.json', 'utf8'));
	return obj;
}

function readPassword(){
	var obj = JSON.parse(fs.readFileSync(config_dir + 'password.json', 'utf8'));
	return obj;
}

function commandArgs(req, res, next) { 
	checkPassword(req.params.password, hashedPassword);

	if (check){
		bashCommand = dir + req.params.module + "/" + req.params.command;
		bashArgs =  " " + req.params.args;
		fs.stat(bashCommand, function(err, stat) {
			if(err === null) {
		 		start(bashCommand + bashArgs,res);
			} else {
				res.send(notFoundError);
			}
		});
	} else {
		res.send(forbiddenError);
	}
	next();
}

function checkPassword(password, hashedPassword){
	check = bcrypt.compareSync(password,hashedPassword);
	if(check){
		return true;
	} else {
		return false;
	}
}

function command(req, res, next) {
	bashCommand = dir + req.params.module + "/" + req.params.command;
	checkPassword(req.params.password, hashedPassword);

	if (check){
		fs.stat(bashCommand, function(err, stat) {
			if(err === null) {
			 	start(bashCommand,res);
			 }
			else {
				res.send(notFoundError);
			}
		});
	} else {
		res.send(forbiddenError);
	}
	next();
}

//Execute a command in a child process
function start(command,res){
	var child;
	child = exec(command, function (error, stdout, stderr) {
		var result= {output: stripAnsi(stdout), error: stripAnsi(stderr), status: error};
		console.log(command);
		console.log('output');
		console.log('------');
		console.log(stdout);
		console.log('------');
		console.log('error');
		console.log('------');
		console.log(stderr);
		console.log('------');
		console.log('status');
		console.log('------');
		console.log(error);
		console.log('------');
		res.send(result);
	});
}
//Read configuration file
config = readConfig();
password = readPassword();
hashedPassword = password.password;
port = config.port;
https = config.https;
dir = config.dir;
modules = getDirectories(dir);
//commands = getCommands(dir,modules);

//Remove port if it is default port
if (port == 433){
	url = "https://" + os.hostname() + ".local/";
}
else{
	url = "https://" + os.hostname() + ".local:" + port + "/";
}

notFoundError = { output:"Command not found, Docs at " + url, error:"Not Found", status:"404"};
forbiddenError = { output:"Forbidden: Invalid Password " + url, error:"Forbidden", status:"403"};
bootMessage = 'Webcontrols ====> ' + url;

//Create restify web server
var server = restify.createServer({
    certificate: fs.readFileSync(config_dir + 'webcontrols.crt'),
    key: fs.readFileSync(config_dir + 'webcontrols.key'),
	});

server.pre(restify.CORS());

server.get('/:module/:command/:args/:password', commandArgs);
server.head('/:module/:command/:args/:password', commandArgs);
server.get('/:module/:command/:password', command);
server.head('/:module/:command/:password', command);
//server.get('/:password', command);
//server.get('/', command);

//Enable restify web server
server.listen(port, function() {
	console.log(bootMessage);
	console.log(config);
	console.log(modules);
});

