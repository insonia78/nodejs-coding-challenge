import * as Users from '../../../data/users.json';
import fs from 'fs';
import { User} from '../../interfaces/user.interface';
import { HelperClass } from './../HelperClass/helperClass';

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
             this.users = HelperClass.sortUserAscEmailArray(JSON.parse(this.users));
        }catch(e)
        {
            console.log(e);
        }

    }
    getAllUsers(sortBy:string = "name",sortDirestion:string = "ascending")
    {
        if(sortBy.localeCompare("email") === 0 && sortDirestion.localeCompare("ascending") === 0)
            return HelperClass.sortUserAscEmailArray(this.users);
        else if(sortBy.localeCompare("email") === 0 && sortDirestion.localeCompare("descending") === 0)
            return HelperClass.sortUserDescEmailArray(this.users);
        else if(sortBy.localeCompare("name") === 0 && sortDirestion.localeCompare("descending") === 0)
            return HelperClass.sortUserDescNameArray(this.users);
        else
            return HelperClass.sortUserAscNameArray(this.users);

    }
    createUser(user:User)
    {
        try{
           this.users.push(user);
           this.users = this.getAllUsers('email');
           this.writeToUserFile(this.users);
        }catch(e)
        {
            console.log(e);
        }
    }
    updateUser(user:User,index:number)
    {
        try{
           this.users = this.getAllUsers('email');
           this.users[index] = user;
            this.writeToUserFile(this.users);
        }catch(e){
            console.log(e);
        }

    }
    private writeToUserFile(users:User[])
    {
        fs.writeFile('data/users.json', JSON.stringify(this.users), (err) => {
            if (err) return console.log(err);
            console.log("writing to users file");
          });
     
    }
}
