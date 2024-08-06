var express = require("express");
var fileuploader = require("express-fileupload");// used to upload file
var mysql = require("mysql");
var app = express();
var cors=require('cors'); 
app.use(cors());




app.listen(2003, function () {0
  console.log("server started");
});
        
app.use(express.static("public")); // public ki file ko use krne k liye(middle ware jo client and server k beech conversation krega)
app.use(fileuploader());  // used to upload image file..



/*  signup.html*/
  

/*app.get("/signup",function(req,resp){
  resp.sendFile(process.cwd()+"/public/signup.html");
});*/

/* index.html*/


app.get("/", function (req, resp) {  // index wala
  resp.sendFile(process.cwd(), "/public/index.html");

});

app.use(express.urlencoded(true));//binary to object(body) conversion



//---------------------------------------------------------------------------------------------
/*signup-secure.html*/


/*app.get("/signup-process",function(req,resp){
  //resp.send("Data Reached");
  var quali="";

  if(req.query.qualib!=undefined)//checked
      quali=req.query.qualib+",";
  
      if(req.query.qualim!=undefined)            
        quali=quali+req.query.qualim;

     if(req.query.qualib==undefined && req.query.qualim==undefined)   
        quali="No Qualification";

      if(quali.endsWith(","))
          quali=quali.substring(0,quali.length-1)  ;

    var city=req.query.comboCity;
  resp.send("Welcome="+req.query.txtEmail+" ,,,,,,  "+req.query.txtPwd+"  Qualification="+quali+" , Occupation="+req.query.occu+" City="+city);

  //---------------File Uploading================
 var fileName="nopic.jpg";
 if(req.files!=null)
   {
     //console.log(process.cwd());
      fileName=req.files.ppic.name;
     var path=process.cwd()+"/public/uploads/"+fileName;
     req.files.ppic.mv(path);
   }

   var city=req.body.comboCity;
   var cities=req.body.listCity.toString();
resp.send("Welcome="+req.body.txtEmail+" <br>  "+req.body.txtPwd+"<br> Qualification="+quali+"<br> Pic Name="+fileName+"<br>  City="+city+"<br>  Cities="+cities);
console.log(req.body);


});

app.get("/signup-secure",function(req,resp)
{
      resp.sendFile(process.cwd()+"/public/signup-secure.html");
});

app.get("/db-signup",function(req,resp)
{
      resp.sendFile(process.cwd()+"/public/DB-signup.html");
})*/
//-------------------------------------------------------------------

//=============DB OPERATIONS=============================
//=============DATABASE CONNECTIVITY====================

var dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "sign",
  dateStrings: true
}

var dbCon = mysql.createConnection(dbConfig);
dbCon.connect(function (jasoos) {
  if (jasoos == null)
    console.log("Connected Successfulllyyy...");
  else
    console.log(jasoos);
});

//==========================================================

//======================saving data in database which is entered on server========================

/*app.post("/profile.html",function(req,resp)
{
  //---------------File Uploading================
  var fileName="nopic.jpg";
  if(req.files!=null)
   {
     //console.log(process.cwd());
    fileName=req.files.ppic.name;
     var path=process.cwd()+"/public/uploads/"+fileName;
     req.files.ppic.mv(path);
   }
    console.log(req.body);
    //resp.send("   File name="+fileName);

    //saving data in table
    var email=req.body.txtEmail;
    var name=req.body.txtName;
    var contact=req.body.txtContact;
    var address=req.body.txtAddress;
    var id=req.body.txtid;
    var dob=req.body.dob;
    var city=req.body.txtCity;
    var gender=req.body.txtGender;
    

         //fixed                             //same seq. as in table
    dbCon.query("insert into stud(email,name,contact,address,id,fileName,dob,city,gender) values(?,?,?,?,?,?,?,?,?)",[email,name,contact,address,id,fileName,dob,city,gender],function(err)
    {
          if(err==null)
            resp.send("Record Saved Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
          else
            resp.send(err);
    })
});


app.get("/profile",function(req,resp){
  resp.sendFile(process.cwd()+"/public/project/profile.html");
});*/

//===================saving index k signup ka data on database===========

app.get("/signup", function (req, resp) {

  var email = req.query.kuchemail;
  var pass = req.query.kuchpass;
  var type = req.query.kuchtype;

  dbCon.query("insert into signup(email,pass,type,status,doj) values(?,?,?,1,current_date())", [email, pass, type], function (err) {
    if (err == null)
      resp.send("Record Saved");
    else
      resp.send(err);

  });


});

//====================check index k login ka data in database=================

app.get("/Login",function(req,resp){
  var email=req.query.kuchemail;
  var password=req.query.kuchpass;
  dbCon.query("select type,status from signup where email=? and pass=?",[email,password],function(err,resultTable){
    if(err==null)
    {
      if(resultTable.length==1)
        {
          if(resultTable[0].status==1)
                resp.send(resultTable[0].type);
          else
               resp.send("U R Blocked");
        }
        else
          resp.send("Invalid User Id/Password");

    }
  else{ 
    resp.send(err.toString());
  }
  })
})

//========================================================================


//===============Saving profile-donor.html data in table=================================

app.post("/profile-donor.html",function(req,resp)
{
  //---------------File Uploading================
  var pic="nopic.jpg";
  if(req.files!=null)
   {
     //console.log(process.cwd());
    pic=req.files.ppic.name;
     var path=process.cwd()+"/public/uploads/"+pic;
     req.files.ppic.mv(path);
   }
    console.log(req.body);
    //resp.send("   File name="+fileName);

    //saving data in table
    var email=req.body.txtEmail;
    var name=req.body.txtName;
    var mobile=req.body.txtmob;
    var address=req.body.txtadd;
    var city=req.body.txtcity;
    var idproof=req.body.txtid;
    var frm=req.body.txtfrm;
    var too=req.body.txtto;
    

         //fixed                             //same seq. as in table
    dbCon.query("insert into donors(email,name,mobile,address,city,idproof,frm,too,pic) values(?,?,?,?,?,?,?,?,?)",[email,name,mobile,address,city,idproof,frm,too,pic],function(err)
    {
          if(err==null)
            resp.send("Record Saved");
          else
            resp.send(err);
    })
});


//=======================================update profile-donor============================

app.post("/update",function(req,resp){
  var fileName="nopic.jpg";
  if(req.files!=null)
    {
      //console.log(process.cwd());
       fileName=req.files.pic.name;
      var path=process.cwd()+"/public/uploads/"+fileName;
      req.files.pic.mv(path);
    }
  var email=req.body.txtEmail;
  var name=req.body.txtName;
  var contact=req.body.txtmob;
  var address=req.body.txtadd;
  var city=req.body.txtcity;
  var id=req.body.txtid;
  var frm=req.body.txtfrm;
  var too=req.body.txtto;
  
  
 
  
  dbCon.query("update donors set name=?,mobile=?,address=?,city=?,idproof=?,pic=?,frm=?,too=? where email=?",[name,contact,address,city,id,fileName,frm,too,email],function(err){
      if(err==null){
          resp.send("Updated successfully");
        }
        else{
          resp.send(err); 
        }
  })


})
//===================saving availmedicine.html====================================

app.get("/avail", function (req, resp) {
  

  var email = req.query.kuchemail;
  var medicinename = req.query. kuchmed;
  var expirydate= req.query.kuchexp;
  var packingtype = req.query.kuchpacktype;
  var quantity = req.query.kuchq;

  dbCon.query("insert into availmedicine(email,medicinename,expirydate,packingtype,quantity) values(?,?,?,?,?)", [email,medicinename,expirydate,packingtype,quantity], function (err) {
    if (err == null){
      resp.send("Record Saved");
      
      
    }
    else
      resp.send(err);

  });


});

//================================================================================


//===============Saving profile-needy.html data in table=================================

app.post("/profile-needy.html",function(req,resp)
{
  //---------------File Uploading================
  var pic="nopic.jpg";
  if(req.files!=null)
   {
     //console.log(process.cwd());
    pic=req.files.ppic.name;
     var path=process.cwd()+"/public/uploads/"+pic;
     req.files.ppic.mv(path);
   }
    console.log(req.body);
    //resp.send("   File name="+fileName);

    //saving data in table
    var email=req.body.txtEmail;
    var name=req.body.txtName;
    var mobile=req.body.txtmob;
    var dob=req.body.txtdate;
    var gender=req.body.txtgen;
    var city=req.body.txtcity;
    var address=req.body.txtadd;
    
    

         //fixed                             //same seq. as in table
    dbCon.query("insert into needyprofile(email,name,mobile,dob,gender,city,address,pic) values(?,?,?,?,?,?,?,?)",[email,name,mobile,dob,gender,city,address,pic],function(err)
    {
          if(err==null)
            resp.send("Record Saved");
            
          else
            resp.send(err);
    })
});

//=============================================================================================================


//=======================saving modal jisme setting donor.html ka data jayega================

app.get("/setting", function (req, resp) {

  var email = req.query.kuchemail;
  var oldpass = req.query.kucholdpass;
  var newpass = req.query.kuchnewpass;
  
  
  

  dbCon.query("update signup set pass=? where email=? and pass=?", [newpass,email,oldpass], function (err) {
    if (err == null)
      resp.send("Password update");
    else
      resp.send(err);

  });


});

//===================needy profile mai fetch button working=======================================
app.get("/get-json-record",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from needyprofile where email=?",[req.query.kuchEmail],function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

app.get("/chkemail",function(req,resp){
  var email=req.query.kuchEmail;
  dbCon.query("select * from needyprofile where email=?",[email],function(err,result){
    if(err==null){
      if(result.length==1){
        resp.send("   &nbsp; &nbsp;: Email Already Exists");
      }
      else {
        resp.send("");
      }
    }
    else{
      resp.send(err);
    }
  })
})

app.get("/get-json-record",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from needyprofile where email=?",[req.query.kuchEmail],function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

//======================================Donor profile mai fetch button working================================

app.get("/getrecords",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from donors where email=?",[req.query.kuchEmail],function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

app.get("/checkmail",function(req,resp){
  var email=req.query.kuchEmail;
  dbCon.query("select * from donors where email=?",[email],function(err,result){
    if(err==null){
      if(result.length==1){
        resp.send("   &nbsp; &nbsp;: Email Already Exists");
      }
      else {
        resp.send("");
      }
    }
    else{
      resp.send(err);
    }
  })
})

app.get("/getrecords",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from donors where email=?",[req.query.kuchEmail],function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

//===========================================Donor profile mai fetch button working======================




//================================Users============================================

//==================fetch all records in users in admin dashboard========================
app.get("/get-angular-all-records",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from signup",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
          else
            resp.send(err);
    })
})


//===================delete Records ===================================================

app.get("/do-angular-delete",function(req,resp)
{
     //saving data in table
    var email=req.query.emailkuch;
    

         //fixed                             //same seq. as in table
    dbCon.query("delete from signup where email=?",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("Account Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})

//===================Block records============================================
app.get("/do-angular-block",function(req,resp)
{
     //saving data in table
    var email=req.query.emailkuch;
    

         //fixed                             //same seq. as in table
    dbCon.query("update signup set status=0 where email=?",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("User Blocked !!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})

//==========================Resume user=======================================================

app.get("/do-angular-resume",function(req,resp)
{
     //saving data in table
    var email=req.query.emailkuch;
    

         //fixed                             //same seq. as in table
    dbCon.query("update signup set status=1 where email=?",[email],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("User Unblocked !!!");
            else
              resp.send("Inavlid Email id");
            }
              else
            resp.send(err);
    })
})


//=================================================================================================

//===========================================Donors Records===============================================

app.get("/get-angular-donor-records",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from signup where type='donor'",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

//===================================================================================================

//===============================================Needy Records=======================================
app.get("/get-angular-needy-records",function(req,resp)
{
         //fixed                             //same seq. as in table
    dbCon.query("select * from signup where type='needy'",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

//==========================================(med-manager.html)===Avail Medicine ka fetch record=========
app.get("/get-angular-dmed-records",function(req,resp)
{
      var email= req.query.kuchemail;
    dbCon.query("select * from availmedicine where email=?",[email] ,function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})

//================================================(med-manager.html)==unavail button=====================

app.get("/dodelete",function(req,resp)
{
     //saving data in table
    var srno=req.query.srkuch;
    

         //fixed                             //same seq. as in table
    dbCon.query("delete from availmedicine where srno=?",[srno],function(err,result)
    {
          if(err==null)
          {
            if(result.affectedRows==1)
              resp.send("unavail");
            else
              resp.send("Inavlid");
            }
              else
            resp.send(err);
    })
})




//===============================================Fecth cities and medicine================================
app.get("/get-angular-city-records",function(req,resp)
{
    dbCon.query("select distinct city from donors",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})



app.get("/get-angular-med-records",function(req,resp)
{
    dbCon.query("select distinct medicinename from availmedicine",function(err,resultTableJSON)
    {
          if(err==null)
            resp.send(resultTableJSON);
              else
            resp.send(err);
    })
})


//==========================================cards opening on show donors button click====================

app.get("/fetch-donors",function(req,resp)
{
  console.log(req.query);
  var med=req.query.medKuch;
  var city=req.query.cityKuch;

  var query="select donors.email,donors.name,donors.address,donors.city,availmedicine.medicinename from donors inner join availmedicine on donors.email= availmedicine.email where availmedicine.medicinename=? and donors.city=?";
  

  dbCon.query(query,[med,city],function(err,resultTable)
  {
    console.log(resultTable+"      "+err);
  if(err==null)
    resp.send(resultTable);
  else
    resp.send(err);
  })
})  

//==================================================
















