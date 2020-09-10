const app  = require('./app');
import {  HelperClass } from './helperClass';

const helperClass = new HelperClass(); 
helperClass.initData();
app.get('/', (req:any, res:any) => {
    res.send('GET - /getAllUsers -> gets all users\n' +
             'POST - /createUser -> create new users' +
             'PUT -  /updateUsers/:user -> updateUsers' +
             'DELETE - /deleteUser/:user - > deleteUser');
});


app.get('/getAllUsers',(req:any, res:any) => {
       res.send(helperClass.getAllUsers());
});
app.post('/createUser',(req:any,res:any) => {

});

app.listen(3000, () =>{
    console.log('Server running on port 3000');
});