import * as Users from '../../../data/users.json';
import fs from 'fs';
import { User,Address } from '../../interfaces/user.interface';
export class UserClass{
    users:any ; 
    user:User = {
        email:"",
        name:"",
        dateOfBirth:"",
        phoneNumber:"",
        address :{
            street:"",
            city:"",
            state:"",
            zipCode:"",
            country:""
        }

    };
    constructor(){}
    initData(){
        try
        {
             this.users =  fs.readFileSync('data/users.json');
             this.users = JSON.parse(this.users);
        }catch(e)
        {
            console.log(e);  
        }
       
    }
    getAllUsers() 
    {
        return this.users;
    }
    createUser(user:User)
    {
        try{
           console.log(user);
           this.users.push(user);
           fs.writeFile('data/users.json', JSON.stringify(this.users), (err) => {
            if (err) return console.log(err);
            console.log("writing to users file");
          });
        }catch(e)
        {
            console.log(e);
        }

    }
}
