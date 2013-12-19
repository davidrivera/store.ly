var p = require('../public/phones/phones'); 
var aws = require('aws-lib');
var config = require('../config.json');


/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};
exports.phones = function(req, res){
    res.json({
        phones:p
    }); 
}
exports.products = function(req,res){
    var prodAdv = aws.createProdAdvClient(config.yourAccessKeyId, config.yourSecretAccessKey, config.yourAssociateTag);

    var options = {SearchIndex: "Blended", Keywords: "computer"}
    prodAdv.call("ItemSearch", options, function(err, result) {
      console.log(result.Items);
        res.json({
            products: result.Items.Item});
    }); 

}
