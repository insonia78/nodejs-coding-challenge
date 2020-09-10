import * as Users from './../data/users.json';
import fs from 'fs';
import { User } from './user.interface';
export class HelperClass{
    users:any ;    
    constructor(){}
    initData(){
       this.users =  fs.readFileSync("data/users.json");
       this.users = JSON.parse(this.users);
    }
    getAllUsers()
    {
        return this.user;
    }
    createUser(user:User){
  }
}
