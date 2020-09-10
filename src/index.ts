const app  = require('./app');
import {  HelperClass } from './helperClass';

let helperClass = new HelperClass(); 
app.get('/', (req:any, res:any) => {
    res.send('GET - /getAllUsers -> gets all users\n' +
             'POST - /createUser -> create new users' +
             'PUT -  /updateUsers/:user -> updateUsers' +
             'DELETE - /deleteUser/:user - > deleteUser');
});


app.get('/getAllUsers',(req:any, res:any) => {
       res.send(helperClass.getAllUsers());
});


app.listen(3000, () =>{
    console.log('Server running on port 3000');
});