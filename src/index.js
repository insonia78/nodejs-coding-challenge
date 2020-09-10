const fs = require('fs');
const users = require('./../data/users.json');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('GET - /getUsers -> gets all users\n' +
             'POST - /createUser -> create new users' +
             'PUT -  /updateUsers/:user -> updateUsers' +
             'DELETE - /deleteUser/:user - > deleteUser');
});


app.get('/getUsers',(req, res) => {
    
});


app.listen(3000, () =>{
    console.log('Server running on port 3000');
});