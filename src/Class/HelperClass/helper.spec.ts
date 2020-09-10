import  { HelperClass }  from './helperClass';
import { User } from './../../interfaces/user.interface';
test('Testing empty method empty string ',()=>{
    const value = HelperClass.isEmpty("");
    expect(value).toBe(true);
});

test('Testing empty method empty null',()=>{
    const value = HelperClass.isEmpty(null);
    expect(value).toBe(true);
});

test('Testing empty method empty array',()=>{
    const value = HelperClass.isEmpty([]);
    expect(value).toBe(true);
});
test('Testing sorting array for User',()=>{
    let user:User[] = [{name:"c",email:"",dateOfBirth:"",phoneNumber:"",address:{street:"",city:"",state:"",zipCode:"",country:""}},
                       {name:"a",email:"",dateOfBirth:"",phoneNumber:"",address:{street:"",city:"",state:"",zipCode:"",country:""}},
                       {name:"b",email:"",dateOfBirth:"",phoneNumber:"",address:{street:"",city:"",state:"",zipCode:"",country:""}}]; 
    const value = HelperClass.sortUserArray(user);
    expect(value).toStrictEqual([{name:"a",email:"",dateOfBirth:"",phoneNumber:"",address:{street:"",city:"",state:"",zipCode:"",country:""}},
                        {name:"b",email:"",dateOfBirth:"",phoneNumber:"",address:{street:"",city:"",state:"",zipCode:"",country:""}},
                        {name:"c",email:"",dateOfBirth:"",phoneNumber:"",address:{street:"",city:"",state:"",zipCode:"",country:""}}]);
});