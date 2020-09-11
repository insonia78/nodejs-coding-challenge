import {  UserClass } from './Class/UserClass/userClass';
import { HelperClass } from './Class/HelperClass/helperClass';
import { HttpResponseCode } from './enums/http.enums';
import { User } from './interfaces/user.interface';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());



const userClass = new UserClass(); 
userClass.initData();

//GET
app.get('/', (req:any, res:any) => {

    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);
    res.status(HttpResponseCode.OK).send('GET - /getAllUsers -> gets all users\n' +
             'POST - /createUser -> create new users' +
             'PUT -  /updateUsers/:user -> updateUsers' +
             'DELETE - /deleteUser/:user - > deleteUser');
             HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});

//GET /getAllUsers
app.get('/getAllUsers',(req:any, res:any) => {
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);
       let allUsers = userClass.getAllUsers();
       if(HelperClass.isEmpty(allUsers))
       {
           res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send("Server Error");
           HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.INTERNAL_SERVER_ERROR);
           return;
       }
       res.status(HttpResponseCode.OK).send(userClass.getAllUsers());
       HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});
//POST
app.post('/createUser',(req:any,res:any) => {
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);
    try
    { 
        if(!HelperClass.validateEmail(req.body.email))
         {
             res.status(HttpResponseCode.BAD_REQUEST).send("Email Formated Wrong");
             HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.INTERNAL_SERVER_ERROR);
             return;
         }
         let users:User[] =  userClass.getAllUsers("email");
         let index:number = users.findIndex(( e:User ) => e.email === req.params.email);
         if(index !== -1 || req.body.name === "" )
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Data non valid");
            HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+ HttpResponseCode.BAD_REQUEST + ":" + "data not valid");
            return;
        }          
        userClass.createUser(req.body);
    }catch(e)
    {
        res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send(e);
        HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.INTERNAL_SERVER_ERROR +":"+ e);
           
    }
    res.status(HttpResponseCode.OK).send("User Created");
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});
//PUT
app.put('/updateUser/:email',(req:any,res:any) => {
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);

    try
    {
        if(!HelperClass.validateEmail(req.params.email))
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Email Formated Wrong");
            HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.BAD_REQUEST);
            return;
        }
        let users:User[] =  userClass.getAllUsers("email");
        let index:number = users.findIndex(( e:User ) => e.email === req.params.email);
        if(index === -1 || req.body.email === "" || req.body.name === "" )
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Bad Request");
            HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.BAD_REQUEST);
            return;
        } 
        userClass.updateUser(req.body,index);
    }catch(e)
    {
        res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send(e);
        HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+ HttpResponseCode.BAD_REQUEST +":"+ e);
    }
    res.status(HttpResponseCode.OK).send("User Updated");
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});
//DELETE
app.delete('/deleteUser/:email',(req:any,res:any) => {
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);

    try
    {
        if(!HelperClass.validateEmail(req.params.email))
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Email Formated Wrong");
            HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.BAD_REQUEST);
            return;
        }
        let users:User[] =  userClass.getAllUsers("email");
        let index:number = users.findIndex(( e:User ) => e.email === req.params.email)
        if(index === -1 || req.body.email === "" || req.body.name === "" )
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Bad Request");
            HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.BAD_REQUEST);
            return;
        } 
        userClass.deleteUser(index);
    }catch(e)
    {
        res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send(e);
        HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+ HttpResponseCode.BAD_REQUEST +":"+ e);
    }
    res.status(HttpResponseCode.OK).send("Delete Updated");
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});
module.exports = app;