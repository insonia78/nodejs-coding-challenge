export interface User{
    email:String,
    name:String,
    dateOfBirth:String,
    phoneNumber:String,
    address: Address

}
export interface Address{
    street:String,
    city:String,
    state:String,
    zipCode:String,
    country:String,
}