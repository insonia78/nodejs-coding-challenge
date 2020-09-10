const _app  = require('./app');

import {  UserClass } from './Class/UserClass/userClass';
import { HelperClass } from './Class/HelperClass/helperClass';
import { HttpResponseCode } from './enums/http.enums';
import { User } from './interfaces/user.interface';


const userClass = new UserClass(); 
userClass.initData();


_app.get('/', (req:any, res:any) => {
    res.status(200).send('GET - /getAllUsers -> gets all users\n' +
             'POST - /createUser -> create new users' +
             'PUT -  /updateUsers/:user -> updateUsers' +
             'DELETE - /deleteUser/:user - > deleteUser');
});


_app.get('/getAllUser',(req:any, res:any) => {
       let allUsers = userClass.getAllUsers();
       if(HelperClass.isEmpty(allUsers))
           res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send("Server Error");
       res.status(200).send(userClass.getAllUsers());
});

_app.post('/createUser',(req:any,res:any) => {
    try
    { 
        if(!HelperClass.validateEmail(req.body.email))
         {
             res.status(HttpResponseCode.BAD_REQUEST).send("Email Formated Wrong");
         }
        userClass.createUser(req.body);
    }catch(e)
    {
        res.status(HttpResponseCode.INTERNAL_SERVER_ERROR).send(e);
    }
    res.status(HttpResponseCode.OK).send("User Created");
});
_app.put('/updateUser/:email',(req:any,res:any) => {
    try
    { 
        if(!HelperClass.validateEmail(req.params.email))
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Email Formated Wrong");
        }
        let index:number = userClass.getAllUsers("email").findIndex(( e:User ) => e.email === req.params.email)
        if(index === -1 || req.body.email === "" || req.body.name === "" )
        {
            res.status(HttpResponseCode.BAD_REQUEST).send("Bad Request");
            return;
        } 
        userClass.updateUser(req.body,index);
    }catch(e)
    {
        res.status(401).send(e);
    }
    res.status(HttpResponseCode.OK).send("User Updated");
});

_app.listen(3000, () =>{
    console.log('Server running on port 3000');
});