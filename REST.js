//https://qiita.com/donaldchi/items/6cf83493b2a8efa402a5

var mysql = require("mysql");

var request = require('request');
var crypto = require('crypto');

var timestamp = Date.now().toString();

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "NodeJS REST API"});
    });

    //====================================
    //
    //             Operate Users
    //
    //====================================
    //create user, POST request
    router.post("/shop/create",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
        var table = ["shop_info","name","detail","price_min","price_max","station","takestime","genre",req.body.name,req.body.detail,10,30,"NAMBA",15,req.body.genre];//md5(req.body.password)
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User created !"});
            }
        });
    });

    //show user list, GET request
    router.get("/shop",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["name"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    //show specific user, GET request
    router.get("/shop/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["name","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    //update uses, PUT request
    router.put("/users/:id",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["shop_info","name",req.body.name,"id",req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });

    //delete users, DELETE request
    router.delete("/shop/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["users","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });

    // //validate users by id and email, GET request
    // router.get("/users/validate/:id/:email",function(req,res){
    //     var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
    //     var table = ["users","email",req.params.email,"id", req.params.id];
    //     query = mysql.format(query,table);
    //     connection.query(query,function(err,rows){
    //         if(err) {
    //             res.json({"Error" : true, "Message" : "Error executing MySQL query!"});
    //         } else {
    //             if (rows=="") {
    //                 res.json({"Error" : true, "Message" : "User not exist!"});
    //             } else {
    //                 res.json({"Error" : true, "Message" : "OK", "token" : rows[0]["user_password"]});
    //             }
    //         }
    //     });
    // });
}

module.exports = REST_ROUTER;