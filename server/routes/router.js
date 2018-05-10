const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser') 
var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig.js');

var queryResult;

const connAttrs = {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    };


    //get all users
    router.get("/allusers",function(req,res){

        oracledb.getConnection(connAttrs, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }
    
    
    
    
        connection.execute(`SELECT 
            USERNAME,
            USER_ID,
            PASSWORD,
            ACCOUNT_STATUS,
            CREATED,
            EXPIRY_DATE,
            PROFILE
        from dba_users`, {}, { outFormat: oracledb.OBJECT},
        function(err, result){
          if (err) {
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error getting the user profile",
                        detailed_message: err.message
                    }));
                } else {
                    res.contentType('application/json').status(200);
                    res.send(JSON.stringify(result.rows));
                }
                 // Release the connection
                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("GET /user_tables : Connection released");
                        }
                    });
        });  
    });
    
    });




// get all users tables.
router.get("/users",function(req,res){

	oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }




	connection.execute("SELECT * from user_tables", {}, { outFormat: oracledb.OBJECT},
    function(err, result){
      if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
             // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_tables : Connection released");
                    }
                });
    });  
});

});


// get all users tables.
router.get("/tablespaces",function(req,res){

	oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }




    connection.execute(`
    SELECT TABLESPACE_NAME "TABLESPACE",
    INITIAL_EXTENT "INITIAL_EXT",
    NEXT_EXTENT "NEXT_EXT",
    MIN_EXTENTS "MIN_EXT",
    MAX_EXTENTS "MAX_EXT",
    PCT_INCREASE
    FROM DBA_TABLESPACES`, {}, { outFormat: oracledb.OBJECT},
    function(err, result){
      if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
             // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_tables : Connection released");
                    }
                });
    });  
});

});





// get all profiles.
router.get("/profiles",function(req,res){

	oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }




	connection.execute("SELECT * from dba_profiles", {}, { outFormat: oracledb.OBJECT},
    function(err, result){
      if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
             // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /profiles : Connection released");
                    }
                });
    });  
});

});



router.post("/addprofile",function(req,res,next){
    var profile =  {
        name: req.body.name,
        sessions: req.body.sessions,
        cpus: req.body.cpus,
        idle: req.body.idle,
        elapsedtime: req.body.elapsedtime
    }
    console.log(req.body)
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }




    connection.execute("CREATE PROFILE "+profile.name+" LIMIT IDLE_TIME "+profile.idle+" CONNECT_TIME "+profile.elapsedtime, {}, { outFormat: oracledb.OBJECT},
    function(err, result){
      if (err) {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: err,
                    detailed_message: err.message
                }));
            } else {
                res.header('Access-Control-Allow-Origin','*'); 
                res.header('Access-Control-Allow-Headers','Content-Type');
                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                res.contentType('application/json').status(200);
                res.send(JSON.stringify({
                    status: 200,
                    message: "Profile created successfully",
                }));
            }
             // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("POST /CREATE PROFILE : Connection released");
                    }
                });
    });  
});

});


        //add new db user
        router.post("/adduser",function(req,res,next){
            console.log(req.body);
            var user  = {
                name:  req.body.name,
                password: req.body.password
            }
            oracledb.getConnection(connAttrs, function (err, connection) {
                if (err) {
                    
                    // Error connecting to DB
                    res.set('Content-Type', 'application/json');
                    res.status(500).send(JSON.stringify({
                        status: 500,
                        message: "Error connecting to DB",
                        detailed_message: err.message
                    }));
                    return;
                }
        
        
        
        
            connection.execute("create user "+user.name+" identified by "+user.password, {}, { outFormat: oracledb.OBJECT},
            function(err, result){
              if (err) {
                        res.header('Access-Control-Allow-Origin','*'); 
                        res.header('Access-Control-Allow-Headers','Content-Type');
                        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "Error getting the user profile",
                            detailed_message: err.message
                        }));
                    } else {
                        res.header('Access-Control-Allow-Origin','*'); 
                        res.header('Access-Control-Allow-Headers','Content-Type');
                        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                        res.set('Content-Type', 'application/json');
                        res.contentType('application/json').status(200);
                        res.send(JSON.stringify({
                            status: 200,
                            message: "User created successfully",
                        }));
                    }
                     // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                console.log("GET /user_tables : Connection released");
                            }
                        });
            });  
        });
        
        });


                //add new db user
        router.post("/addtablespace",function(req,res,next){

                    var ts  = {
                        name : req.body.TABLESPACE,
                        datafile: req.body.datafile,
                        size: req.body.size
                    }

                    oracledb.getConnection(connAttrs, function (err, connection) {
                        if (err) {
                            
                            // Error connecting to DB
                            res.set('Content-Type', 'application/json');
                            res.status(500).send(JSON.stringify({
                                status: 500,
                                message: "Error connecting to DB",
                                detailed_message: err.message
                            }));
                            return;
                        }
                
                
                
                
                    connection.execute("CREATE TABLESPACE "+ts.name+" DATAFILE '"+ts.datafile+"' SIZE "+ts.size, {}, { outFormat: oracledb.OBJECT},
                    function(err, result){
                      if (err) {
                                res.header('Access-Control-Allow-Origin','*'); 
                                res.header('Access-Control-Allow-Headers','Content-Type');
                                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                                res.set('Content-Type', 'application/json');
                                res.status(500).send(JSON.stringify({
                                    status: 500,
                                    message: "Error getting the user profile",
                                    detailed_message: err.message
                                }));
                            } else {
                                res.header('Access-Control-Allow-Origin','*'); 
                                res.header('Access-Control-Allow-Headers','Content-Type');
                                res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
                                res.set('Content-Type', 'application/json');
                                res.contentType('application/json').status(200);
                                res.send(JSON.stringify({
                                    status: 200,
                                    message: "Tablespace created successfully",
                                }));
                            }
                             // Release the connection
                            connection.release(
                                function (err) {
                                    if (err) {
                                        console.error(err.message);
                                    } else {
                                        console.log("post /ts : Connection released");
                                    }
                                });
                    });  
                });
                
                });



module.exports = router;