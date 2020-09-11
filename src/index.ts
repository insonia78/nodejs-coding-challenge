const _app  = require('./app');

import {  UserClass } from './Class/UserClass/userClass';
import { HelperClass } from './Class/HelperClass/helperClass';
import { HttpResponseCode } from './enums/http.enums';
import { User } from './interfaces/user.interface';


const userClass = new UserClass(); 
userClass.initData();

//GET
_app.get('/', (req:any, res:any) => {

    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);
    res.status(HttpResponseCode.OK).send('GET - /getAllUsers -> gets all users\n' +
             'POST - /createUser -> create new users' +
             'PUT -  /updateUsers/:user -> updateUsers' +
             'DELETE - /deleteUser/:user - > deleteUser');
             HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});

//GET /getAllUsers
_app.get('/getAllUsers',(req:any, res:any) => {
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);
       let allUsers = userClass.getAllUsers();
       console.log("getAllUser");
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
_app.post('/createUser',(req:any,res:any) => {
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl);
    try
    { 
        if(!HelperClass.validateEmail(req.body.email))
         {
             res.status(HttpResponseCode.BAD_REQUEST).send("Email Formated Wrong");
             HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.INTERNAL_SERVER_ERROR);
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
_app.put('/updateUser/:email',(req:any,res:any) => {
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
        userClass.updateUser(req.body,index);
    }catch(e)
    {
        res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send(e);
        HelperClass.LoggerError(req.method + ":"+ req.originalUrl +":"+ HttpResponseCode.BAD_REQUEST +":"+ e);
    }
    res.status(HttpResponseCode.OK).send("User Updated");
    HelperClass.LoggerInfo(req.method + ":"+ req.originalUrl +":"+HttpResponseCode.OK);

});

_app.listen(3000, () =>{
    HelperClass.LoggerInfo('Server running on port 3000');
    console.log('Server running on port 3000');
});