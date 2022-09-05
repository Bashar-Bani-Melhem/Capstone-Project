export interface Activity{
    uid?:string,
    Name:string,
    Description:string,
    SkillsRequired:string[]|null|undefined, 
    range:{
       StartDate?:Date|null|undefined,
       EndDate?:Date|null|undefined, 
    },
    Numberoftechnologistsrequired:number|null|undefined,
    companyId:string |undefined,
    companyName?:string,
    companyType?:string,
}