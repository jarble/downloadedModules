var http = require('http');
var fs = require('fs');
var async = require('async');

//downloadModule("functionChecker.js");
async.series({
	functionChecker: function(callback){
		//leave out http://
		//add files here: https://code.google.com/p/javascript-modules/source/browse/#svn%253Fstate%253Dclosed
		downloadModule('javascript-modules.googlecode.com/svn/functionChecker.js', callback); //this gets
	},
	colorNames: function(callback){
		//leave out http://
		//add files here: https://code.google.com/p/javascript-modules/source/browse/#svn%253Fstate%253Dclosed
		downloadModule('javascript-modules.googlecode.com/svn/colorNames.js', callback); //this gets
	},
	//stuff: function(callback){
		//downloadModule("stuff.js", callback); //this gets
	//}
},
function(err, results){
	results.functionChecker.checkAllFunctions(__filename);
	console.log(results.colorNames.getColorNames().toString());
});

function getHostName(theString){
	return theString.substring(0, theString.indexOf("/"));
}

function getPath(theString){
	return theString.substring(getHostName(theString).length, theString.length);
}

function getFileName(theString){
	return theString.substring(theString.lastIndexOf("/"), theString.length);
}

function downloadModule(filename, callback) {
  http.get({
    hostname: getHostName(filename),
    path: getPath(filename)
  }, function(res){
    var out = fs.createWriteStream(__dirname + "/downloadedModules/" + getFileName(filename));
    out.on('close', function(){
      //this is where you use the module that was downloaded
      var returnThis = require(__dirname + "/downloadedModules/" + getFileName(filename));
      callback(null, returnThis); //"return" returnThis so that it can be used in the final callback of async.series
    });
    res.pipe(out);
  });
}

//function name: blahblah
//requires functions: false 
//is defined: false
//description: blah
