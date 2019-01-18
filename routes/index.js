var express = require('express');
var router = express.Router();
var request = require('request');
var btoa = require('btoa');
const ejsLint = require('ejs-lint');
var axios = require('axios');
var querystring = require('querystring');

//var angular = require('angular');


/* GET home page changed from todel to index.      DELETEREQ*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MAPPINGS' });
});

/* GET MAPPINGS FORM (index)*/
router.get('/index.ejs', function(req, res, next) {
  res.render('index', { title: 'GET' });
});

/* GET MAPPINGS FROM  CREATE NEW */
router.get('/indexcopy.ejs', function(req, res, next) {
  res.render('indexcopy', { title: 'GET' , naam:req.session.uname, pas: req.session.pass});
});

/* GET MAPPINGS FROM DELETE */
router.get('/api/index.ejs', function(req, res, next) {
  res.render('index', { title: 'GET' , naam:req.session.uname, pas: req.session.pass});
});


/* POST MAPPINGS FORM (index2 from get page)*/
router.get('/api/index2.ejs', function(req, res, next) {
  res.render('index2', { title: 'POST' });
});
 
router.get('/index2.ejs', function(req, res, next) {
  res.render('index2', { title: 'POST' });
});

/* HOME PAGE */
router.get('/todel.ejs', function(req, res, next) {
  res.render('todel', { title: 'HOME' });
});

/* FOR POST REQUEST */
router.get('/api', (req, res)=>{

  var data = {
    "domain": "mydomain.com",
    "jabberAddress": req.query.xmpp,
    "externalAddress": req.query.number
    }
  var url = 'https://cloud.restcomm.com/xmpp/xmppMappings';
  var username = req.query.name;
  var password = req.query.password;

  request.post( {
    url : url,
    body : data,
    json : true,
    method : 'POST',
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password),
      "content-type": "application/json",
    }

  } , (err , doc)=>{

    if ( err ){
      res.render('error', {
        message: err.message, 
        error: err
      //res.send( err )
      });
    }
    else{
     // res.send(doc.body)
     var data = doc.body;
     res.render('ress2', {mappings:data });    //, naam:req.session.uname, pas: req.session.pass})
    }
    console.log(data);
  } )

} )


/* FOR GET REQUEST */
router.get('/api/get' , (req, res)=>{
   
req.session.uname = req.query.name;
req.session.pass = req.query.password;

//console.log(req.body.name);
  var username = req.query.name;
  var password = req.query.password;
  
  var url = 'https://cloud.restcomm.com/xmpp/xmppMappings';

  if(password.length<=0 || username.length<=0){
    res.send("Enter username and password")
  }
  request.get( {
    url : url,
    method : 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa(username + ":" + password)
    }

  } , (err , doc, body)=>{

   
    if ( !body ){
      //res.send( err )
      console.log(err, "123");
      res.render('error', {
        message: err.message, 
        error: err
      //res.send( err )
      });
      //render('error', err)
    }
      else{
        console.log(doc);
        //res.send(JSON.stringify(doc));
         var myObj = doc.body;
         var body = JSON.parse(myObj);
          console.log(body)
        var data = [];
        for (a in body){
         val =body[a];
          var temp={
            id : val.id,
            jabberAddress : val.jabberAddress,
            externalAddress : val.externalAddress
          }
            data.push(temp);
        } 
    // res.send(body)
       //res.send({mappings: data})
       //res.send({mapping1 : data[0],  mapping2 : data[1]}) 
        res.render('ress', {mappings:data, naam:req.session.uname, pas: req.session.pass})    //change 2

    }
console.log("Basic " + btoa(username + ":" + password));
console.log(req.session.uname);

  } )
})



/* FOR DELETE REQUEST */
router.get('/api/delete', (req, res)=>{

  var data = {
  /*   "domain": "mydomain.com",
    "jabberAddress": req.query.xmpp,
    "externalAddress": req.query.number */
    
    }
    var data = req.query.id;
  var url = 'https://cloud.restcomm.com/xmpp/xmppMappings/' + data;
/*   var username = req.query.name;
  var password = req.query.password; */

  var username = req.session.uname;
  var password = req.session.pass;

 console.log(url);

  request.delete( {
    url : url,
    //body : data,
    //json : true,
    method : 'DELETE',
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password),
      //"content-type": "application/json",
    }

  } , (err , doc)=>{

    if ( err ){
      res.render('error', {
        message: err.message, 
        error: err
      //res.send( err )
      });
    }
    else{                   //CHANGED FROM RESS3 TO INDEXCOPY            - - - - - - - -CHANGE- - - - - - - - -
       
      var data = doc.body;
      res.render('ress3', {mappings:data, naam:req.session.uname, pas: req.session.pass})
      //res.send(doc)
     // res.send(doc.body)
     //var data = doc.body;
     //res.render('ress2', {mappings:data})
    }
    console.log(data);
  } )

} )

module.exports = router;




/*
$.ajax({
    type:"POST",
    url: proxy + url,
    dataType: 'json',
  headers: {
    "Authorization": "Basic " + btoa(username + ":" + password)
  },
    data:{
    
    "jabberAddress": "sunnyd@xmpp.xyz",
    "externalAddress": "12017780615"

    
    },
    success: function(json) {
        alert("Success", json);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
       alert(textStatus, errorThrown);
    }
*/



/* 
"domain": "mydomain.com",
"jabberAddress": "sunnyd@xmpp.xyz",
"externalAddress": "12017780615"
}
var url = 'https://cloud.restcomm.com/xmpp/xmppMappings';
var username = "AC23f1b11bbb99a46436c365cb7bec246e";
var password = "eef96b9afe3b9ebcbf051d8adf715943"; */











/*       134 134 134 134
else{
        

  var myObj = doc.body;
  var body = JSON.parse(myObj);
   console.log(body)
 var data = [];
 for (a in body){
  val =body[a];
   var temp={
     id : val.id,
     jabberAddress : val.jabberAddress  
   }
     data.push(temp);
 } 
// res.send(body)
res.send({mappings: data}) */
//res.send({mapping1 : data[0],  mapping2 : data[1]}) 


/* {"mappings":[{"id":"XM35718ebf536545f2a4eefdbb37a24415","jabberAddress":"joe@uc1.mycompany.com"},{"id":"XM5514cb720d7f49a9a66a6442f79bbfaf","jabberAddress":"abhayani@xmpp.xyz"},{"id":"XM6ec5ff363a6c401cb7c33dc506110e85","jabberAddress":"sunnyd@xmpp.xyz"},{"id":"XMc9f13378afaf41fcba81309292ed60e5","jabberAddress":"draperbuilding_2221@ums.veracitynetworks.com"}]} */