export interface Company{
    id:string,
    EmailAddress:string,
    Password?:string,
    confirmPassword?:string
    CompanyName:string,
    PhoneNumber?:number |undefined|null,
    Type:string,
    WebsiteURL:string
  }