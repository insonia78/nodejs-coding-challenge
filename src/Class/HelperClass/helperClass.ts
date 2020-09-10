import { User } from "../../interfaces/user.interface";

export class HelperClass{

    static isEmpty(value:any)
    {
        return (!value || 0 === value.length || /^\s*$/.test(value));
    }
    static sortUserArray(array:Array<User>)
    {
        return array.sort((n1,n2)=>{
            return n1.name.localeCompare(n2.name);
        });
    }
}