
/*
 * GET home page.
 */
var http = require("http");
var parser = require('xml2js');
var parseString = parser.parseString;

exports.index = function(req, res){
	res.render("index", {});
};
