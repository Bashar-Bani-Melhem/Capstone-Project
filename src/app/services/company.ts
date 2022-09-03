export interface Company{
    id:string,
    EmailAddress:string,
    Password?:string,
    confirmPassword?:string
    Logo:string, 
    CompanyName:string,
    PhoneNumber?:number |undefined|null,
    Type:string,
    WebsiteURL:string
  }