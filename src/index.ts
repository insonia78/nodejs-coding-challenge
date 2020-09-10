const _app  = require('./app');

import {  UserClass } from './Class/UserClass/userClass';
import { HelperClass } from './Class/HelperClass/helperClass';



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
           res.status(500).send();
       res.status(200).send(userClass.getAllUsers());
});

_app.post('/createUser',(req:any,res:any) => {
    try
    { 
       userClass.createUser(req.body);
    }catch(e)
    {
        res.status(401).send(e);
    }
    res.status(200).send("User Created");
});


_app.listen(3000, () =>{
    console.log('Server running on port 3000');
});