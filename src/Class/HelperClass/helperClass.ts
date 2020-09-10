import { User } from "../../interfaces/user.interface";

export class HelperClass{

    static isEmpty(value:any)
    {
        return (!value || 0 === value.length || /^\s*$/.test(value));
    }
    static sortUserAscEmailArray(array:Array<User>)
    {
        return array.sort((n1,n2)=>{
                 if(n1.email > n2.email)
                     return 1;
                 if(n1.email < n2.email)
                     return -1;
                 return 0;
            //return n1.name.localeCompare(n2.name);
        });
    }
    static sortUserDescEmailArray(array:Array<User>)
    {
        return array.sort((n1,n2)=>{
                 if(n1.email < n2.email)
                     return 1;
                 if(n1.email > n2.email)
                     return -1;
                 return 0;
            
        });
    }
    static sortUserAscNameArray(array:Array<User>)
    {
        return array.sort((n1,n2)=>{
                 if(n1.name > n2.name)
                     return 1;
                 if(n1.name < n2.name)
                     return -1;
                 return 0;
            //return n1.name.localeCompare(n2.name);
        });
    }
    static sortUserDescNameArray(array:Array<User>)
    {
        return array.sort((n1,n2)=>{
                 if(n1.name < n2.name)
                     return 1;
                 if(n1.name > n2.name)
                     return -1;
                 return 0;
        });
    }

    static validateEmail(email:string) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regex.test(email)
      }
}