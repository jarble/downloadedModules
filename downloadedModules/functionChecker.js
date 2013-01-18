
//print the output if the name of a file is entered as a command-line argument.

if(typeof(process) != 'undefined'){
	if(process.argv.length == 3){
		checkAllFunctions(process.argv[2]);
	}
}
	    console.log("To use in the browser, use the enclosing function name (without quotes) as the first parameter, and the function to check (with quotes) as the second parameter.")
	    console.log("    Example: functionChecker.checkAllFunctions(enclosingFunction, 'functionToCheck')\n\n\n");
	    console.log("To check a specific function, write:\n functionChecker.checkAllFunctions(__filename, 'functionToCheck');")
	    console.log("To check the contents of a function or object, don't surround the second parameter in quotes.");
	    console.log("To check a specific function inside a function, use a third parameter to specify the function.");
		
//This function works for either file names or function names as parameters.
define('functionChecker', ['getAllDefinedFunctions'], function(getAllDefinedFunctions){
return {
checkAllFunctions : function(filename, functionToCheck){
//This is a function checker for hierarchies of unimplemented functions. I use this script for all of my projects,
//and it has saved me hours of work!
//It will automatically tell you which functions can be implemented, given a series of comments above each function.
//It currently works with all programming languages that use // for comments.
//It requires node.js.
//var filename = "/home/anderson/Desktop/testStuff.js"; //replace this with the name of the file that you want to check. It should be saved in the same folder
//(continued from above) as this script.


//Below (in the next 4 comments) is a sample function description that can be included in any source file that uses this comment format.
//There must be no whitespace before the //; otherwise it won't work.

//function name: stuff
//requires functions: false
//is defined: true
//description: do some stuff

if(functionToCheck != undefined){
	console.log("Check the function " + functionToCheck);
}

var s;
var functionsList = new Array();
function addFunction(functionName) {
	//console.log("adding function " + functionName);
    s = functionName.prototype;
    functionsList[functionsList.length] = functionName;
    //var functionNameIsReallyValid = functionNameIsValid(functionName);
    //if(!functionNameIsReallyValid){
    //	alert("Function name is valid: " + functionNameIsReallyValid);
    //}
}

//function name: stuff
//requires functions: false
//is defined: true
//description: do some stuff
function stuff(){
	
}

//function name: stuff2
//requires functions: stuff
//is defined: false
//description: do some other stuff
function stuff2(){
	
}


//function getFunctions(filename){
	//console.log("Calling getFunctions!");
	
    var arr = get2DCommentArrayFromFile(filename);
    
    var functionName;
    
    for(var i = 0; i < arr.length; i++){
			var current = arr[i][0];
			functionName = current.substring("//function name: ".length, current.length);
			eval("var " + functionName + " = function "+functionName+"(){}");
			addFunction(eval(functionName));
	}
	for(var i = 0; i < arr.length; i++){
		for(var j = 0; j < arr[i].length; j++){
			var current = arr[i][j];//refers to a comment string
			//console.log("Current: " + current)
			if(current.indexOf("//function name:") != -1){
				functionName = current.substring("//function name: ".length, current.length);
				//eval("var " + functionName + " = function "+functionName+"(){}");
				addFunction(eval(functionName));
				//create a new function with the function name (this will automatically be accessible outside the for-loop)
				//eval("var " + functionName + "= function(){//"+functionName + "}");
				//set currentFunction to the newly created function
				//console.log("Should be function source code: " + currentFunction);
			}
			if(current.indexOf("//description: ") != -1){
				s.description = current.substring("//description: ".length, current.length);
				//create a new function with the function name (this will automatically be accessible outside the for-loop)
				//eval("var " + functionName + "= function(){//"+functionName + "}");
				//set currentFunction to the newly created function
				//console.log("Should be function source code: " + currentFunction);
			}
			if(current.indexOf("requires functions: ") != -1){
				var requiresTheFunctions = current.substring("//requires functions: ".length, current.length);
				if(requiresTheFunctions == "false"){
					s.requiresTheFunctions = false;
				}
				else{
					var requiredFunctionArray = requiresTheFunctions.split(", ");
					for(var z = 0; z < requiredFunctionArray.length; z++){
						requiredFunctionArray[z] = eval(requiredFunctionArray[z]);
					}
					s.requiresTheFunctions = requiredFunctionArray;
				}
				//set currentFunction.prototype.requiresTheFunctions to the list of functions
				//use eval to convert the list to an array
				//currentFunction.prototype.requiresTheFunctions = 
			}
			if(current.indexOf("is defined: ") != -1){
				//set currentFunction.prototype.isDefined to the truth value here
				var isDefined = current.substring("//is defined: ".length, current.length);
				//console.log(isDefined);
				if(isDefined == "true"){
					s.isDefined = true;
				}
				else{
					s.isDefined = false;
				}
			}
		}
	}
	if(functionToCheck != undefined){
		implementsTheInterface(eval(functionToCheck));
	}
	else{
		implementsTheInterface(getAllFunctions());
	}
	//console.log("\n\n\n" + getFunctionInformation + "\n\n\n"); //this 
	//use implementsTheInterface here
	//create functions from the first element of each array
	//example of putting something outside a for-loop from in the for-loop: http://jsfiddle.net/QBAEj/1/
//}

function get2DCommentArrayFromFile(filename){
	var arr = getCommentArrayFromFile(filename);
	arr[arr.length] = "//function name: teeheehee"
	//find out how to split arrays
	//use array.slice(start, end)
	//the starting index is inclusive, but the ending index is not inclusive.
	var newArr = new Array();
	var startingIndex = 0;
	var endingIndex = 0;
	for(var i = 0; i < arr.length; i++){
		if(arr[i].indexOf("//function name: ") == 0){
			//create the array for the thing
			startingIndex = endingIndex;
			endingIndex = i;
			//put into newArr
			if(endingIndex != 0){
				newArr[newArr.length] = arr.slice(startingIndex, endingIndex); //make sure that this works correctly
				//console.log("Starting index: " + startingIndex + "\nEnding index:" + endingIndex);
			}
		}
	}
	//console.log(newArr);
	return newArr;
}

function getCommentArrayFromFile(filename){
	var arr = getLineArrayFromFile(filename);
	var arr2 = new Array();
	for(var i = 0; i < arr.length; i++){
		if(arr[i].indexOf("//function name:") == 0){
			//console.log(arr[i]);
			arr2[arr2.length] = arr[i];
		}
		if(arr[i].indexOf("//requires functions:") == 0){
			//console.log(arr[i]);
			arr2[arr2.length] = arr[i];
		}
		if(arr[i].indexOf("//is defined:") == 0){
			//console.log(arr[i]);
			arr2[arr2.length] = arr[i];
		}
		if(arr[i].indexOf("//description:") == 0){
			//console.log(arr[i]);
			arr2[arr2.length] = arr[i];
		}
	}
	return arr2;
}

function getLineArrayFromFile(filename){
var array;
if(typeof filename == "string"){		
	var fs = require('fs');
	array = fs.readFileSync(filename).toString().split("\n");
}
if(typeof filename == "function"){
	array = filename.toString().split("\n");
	//console.log(array);
}
if(typeof filename == "object"){
	var newString;
	for(var key in filename) {
		newString += filename[key];
		//alert(filename[key]);
	}
	//console.log(newString);
	array = newString.split("\n");
	//console.log(array);
}
	for(var i = 0; i < array.length; i++){
		array[i] = array[i].trim();
	}
	return array;
}

var hasBeenChecked = new Array();
function implementsTheInterface(theFunction, writeStuff) {
    //writeMessage(typeof theFunction);
    if (typeof theFunction != "function") {
		//console.log("The type is not a function!");
        for (var i = 0; i < theFunction.length; i++) {
            implementsTheInterface(eval(theFunction[i]));
        }
        return false;
    }
    else{
		//console.log("The type is a function!");
	}

    if (hasBeenChecked == undefined) {
        hasBeenChecked = new Array();
    }
    for (var i = 0; i < hasBeenChecked.length; i++) {
        if (hasBeenChecked[i] == theFunction) {
            //writeMessage("<font color = blue>The function " + getFunctionLink(theFunction) + " has already been checked!</font><br />");
            return 0;
        }
    }
    hasBeenChecked[hasBeenChecked.length] = theFunction;
    var functionName = getFunctionName(theFunction);
    //writeMessage("Checking the function " + getFunctionLink(theFunction) + "<br />");

	function writeAMessage(text){
		if(writeStuff == true){
			writeMessage(text);
		}
	}

    if (canBeImplemented(theFunction)) {
        var aMessage = "\n\n//The function " + getFunctionLink(theFunction) + " can be implemented! \n//Description: " + theFunction.prototype.description + "\n //It requires the functions:";
        for (var i = 0; i < theFunction.prototype.requiresTheFunctions.length; i++) {
			var currentFunction = theFunction.prototype.requiresTheFunctions[i];
            aMessage += ("\n//" + functionSignature(currentFunction) + "\n//" + currentFunction.prototype.description);
            //function getFunctionSignature(){
            //	var str = theFunction.prototype.requiresTheFunctions[i].toString();
            //	return str.substring(str.indexOf(" "), str.indexOf("{"))+ ": " + theFunction.prototype.requiresTheFunctions[i].prototype.description;
            //}
        }
        //aMessage += theFunction.prototype.requiresTheFunctions;
        if(theFunction.prototype.requiresTheFunctions == false){
			aMessage += "\n//none";
		}
		if(theFunction.prototype.requiresTheFunctions === undefined){
			aMessage += "\n//none";
		}
        writeMessage(aMessage);
    }
    //(t>>(18-t%4))*((t+t*(5))>>10|t­)﻿

    else {
        writeAMessage("\nThe function " + getFunctionLink(theFunction) + "cannot be implemented!");
    }

    if (theFunction == undefined) {
        writeAMessage("The function is undefined!");
    }

    if (theFunction.prototype.isDefined == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.isDefined is undefined! Please give it a value! <br/>");
    } else {
        //writeMessage("The value of the doStuff.prototype.isDefined is " + doStuff.prototype.isDefined);
    }

    var reqFun = theFunction.prototype.requiresTheFunctions;
    //writeMessage("reqfun.length is " + reqFun.length);

    if (reqFun == undefined) {
        writeAMessage(getFunctionLink(theFunction)+".prototype.requiresTheFunctions is undefined! Please give it a value!");
    } else if (reqFun == false) {
        //writeMessage("The function " + getFunctionLink(theFunction) + " does not require any functions. <br />");	
    } else {
        //writeMessage("The required functions for "+getFunctionLink(theFunction)+" are defined. <br />");
        //writeMessage("The value of the doStuff.prototype.requiresTheFunctions is " + doStuff.prototype.requiresTheFunctions);
        for (var i = 0; i < reqFun.length; i++) {
            //writeMessage("Checking to see if the function " + getFunctionLink(reqFun[i]) + " is implemented.<br />");
            implementsTheInterface(reqFun[i]);
        }
    }

    if (theFunction.prototype.parameterTypes == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.parameterTypes is undefined! Please give it a value! <br/>");
    } else {
        //writeMessage("The value of the doStuff.prototype.parameterTypes is " + doStuff.prototype.requiresTheFunctions);
    }

    if (theFunction.prototype.returnType == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.returnType is undefined! Please give it a value! <br/>");
    } else {
        //writeMessage("The value of the doStuff.prototype.parameterTypes is " + doStuff.prototype.requiresTheFunctions);
    }

    if (theFunction.prototype.regexArray == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.regexArray is undefined! Please give it a value! <br/>");
    } else {
        //writeMessage("The value of the doStuff.prototype.parameterTypes is " + doStuff.prototype.requiresTheFunctions);
    }

    if (theFunction.prototype.description == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.description is undefined! Please give it a value! <br/>");
    } else {
        //writeMessage("The value of the doStuff.prototype.parameterTypes is " + doStuff.prototype.requiresTheFunctions);
    }

    if (theFunction.prototype.exampleRegexMatches == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.exampleRegexMatches is undefined! Please give it a value! <br/>");
    }

    if (theFunction.prototype.requiresFunctionsMatchingStrings == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.requiresFunctionsMatchingStrings is undefined! Please give it a value! <br/>");
    } else {
        //writeMessage("The value of the doStuff.prototype.parameterTypes is " + doStuff.prototype.requiresTheFunctions);
        if (theFunction.prototype.regexArray != undefined) {
            writeAMessage("The regex and regex array are both implemented for this function: " + getFunctionLink(theFunction) + "<br/>");
            writeAMessage("Check to see whether the regexes match the strings. Use an external function. <br />");
            //use regexesMatchStringsInSameOrder
        }
    }

    if (theFunction.prototype.functionNameRegexes == undefined) {
        //writeMessage(getFunctionLink(theFunction)+".prototype.functionNameRegexes is undefined! Please give it a value! <br/>");
    }
    //console.log("Implementable functions:\n\n\n\n\n\n\n\n\n\n\n\n" + implementableFunctions);
}

function getAllFunctions() {
    return functionsList;
}

function getFunctionName(theFunction) {
    var str = theFunction.toString();
    return str.substring(str.indexOf(" ") + 1, str.indexOf("("));
}

function canBeImplemented(theFunction) {
    var functionName = getFunctionName(theFunction);
    var funs = theFunction.prototype.requiresTheFunctions;
    if (theFunction.prototype.isDefined == true) {
        //writeMessage("The function " + functionName + " is already implemented!");
        return false;
    }
    if (funs == undefined) {
        //writeMessage(functionName + "'s required functions are not yet listed!")
        return false;
    }
    if (funs == false) {
        //writeMessage("The function " + getFunctionName(theFunction) + " requires no functions!<br />");
    }
    for (var i = 0; i < funs.length; i++) {
        //writeMessage("Checking " + getFunctionName(funs[i]) + "<br />");
        if (funs[i].prototype.isDefined != true) {
            //writeMessage(getFunctionName(funs[i]) + "is not yet defined!");
            implementsTheInterface(funs[i]);
            return false;
        }
        //writeMessage(getFunctionName(funs[i]) + " is defined!");
    }
    return true;
}

function getFunctionLink(theFunction) {
    return functionSignature(theFunction);
}

function functionSignature(theFunction) {
    var str = theFunction.toString();
    return str.substring(str.indexOf(" "), str.indexOf("{"));
    //return "blah";
}

function writeMessage(message) { //fix this so that it works with node.js
    //find out how to check whether a variable is defined; this doesn't work in Java
    if (((typeof document) != "undefined") && ((typeof document.write) != "undefined")) { // running in a web browser
        console.log(message);
    } else if (typeof process !== 'undefined' && process && process.versions && process.versions.node) {
        //console.log('node version:', process.version);
        console.log(message); //then it's node
    } else { // it will be Rhino
        print(message);
    }
}
}
}
});
//exports.checkAllFunctions = checkAllFunctions;
