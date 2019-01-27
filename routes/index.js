var express = require('express');
var router = express.Router();
var request = require('request');
var btoa = require('btoa');
const ejsLint = require('ejs-lint');
var axios = require('axios');
var querystring = require('querystring');
var username= "";
var password= "";



/* GET home page changed from todel to index.      DELETEREQ*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MAPPINGS' });
});
function checksession (){
  //check if the session variable are set
  //rreturn true if the value are set else false

}
/* GET MAPPINGS FORM (index)*/
router.get('/index.ejs', function(req, res, next) {
  res.render('index', { title: 'GET' });
});

/* GET MAPPINGS FROM  CREATE NEW */
router.get('/api/indexcopy.ejs', function(req, res, next) {
  res.render('indexcopy', { title: 'GET' , naam:res.locals.unn, pas: res.locals.pss});
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
  var jabberAddress = req.query.xmpp;
  var externalAddress = req.query.number;
 /*  if(jabberAddress.length<=6 || externalAddress.length<3){
  
    console.log("redirect hoga indexcopy2 peh");
  
    res.render('indexcopy2', { naam:req.query.name, pas:req.query.password })
  } */

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

    /*  if ( err ){
      res.render('error', {
        message: err.message, 
        error: err
      //res.send( err )
      });
    }  */
    if(doc.body == "InvalidArgumentError" || doc.body == "XmppMappingAlreadyExistError" || doc.body == "XmppMappingAlreadyExistError" || doc.body == "ExternalAddressAlreadyExistError" || doc.body =="JabberAddressAlreadyExistError"){
      console.log("redirect hoga indexcopy2 peh");
      res.render('indexcopy2', {vall:doc.body ,naam:req.query.name, pas:req.query.password })
    }
  
    else{
      //console.log("yaha n=bhi aaya else part meh");
     // res.send(doc.body)

     //res.send(doc);
    console.log("yeh doc hai niche");
     console.log(doc);
     var data = doc.body;
     console.log("yeh data print hoga niche");
     console.log(data);
      res.locals.unn = req.query.name;
      res.locals.pss = req.query.password;
     res.render('ress2', {mappings:data, naam:res.locals.unn, pas: res.locals.pss});    //, naam:req.session.uname, pas: req.session.pass})
    }
    console.log(data);
  } )

} )



/* FOR GET REQUEST */
router.get('/api/get' , (req, res)=>{
   


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

   
    /* if ( !body ){
      //res.send( err )
      console.log(err, "123");
      res.render('error', {
        message: err.message, 
        error: err
      //res.send( err )
      });
      //render('error', err)
    } */
      if(doc.body == "Unauthorized"){
        res.render('ind',{vall:doc.body })
       // res.send(doc.body);
      }

      else{

        //console.log(doc);
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
    /*     req.session.un = req.query.name;
        req.session.ps = req.query.password;
        console.log("session variables are");
        console.log(req.session.un ); */
        res.locals.unn = req.query.name;
        res.locals.pss = req.query.password;
      
        res.render('ress', {mappings:data, naam:res.locals.unn, pas: res.locals.pss })    //change 2

    }
console.log("Basic " + btoa(username + ":" + password));


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
   var username = req.query.name2;
  var password = req.query.password2; 

 /*  var username = req.session.uname;
  var password = req.session.pass; */

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
      res.locals.unn = req.query.name2;
      res.locals.pss = req.query.password2;
      res.locals.iddd = req.query.id;
      res.render('indexcopy', {mappings:data, naam:res.locals.unn,  pas:res.locals.pss,idhai:res.locals.iddd})
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