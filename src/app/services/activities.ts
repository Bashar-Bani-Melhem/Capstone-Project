export interface Activity{
    uid?:string,
    Name:string,
    Description:string,
    SkillsRequired:string[]|null|undefined, 
    range:{
       StartDate?:any|null|undefined,
       EndDate?:any|null|undefined, 
    },
    Numberoftechnologistsrequired:number|null|undefined,
    companyId:string |undefined,
    companyName?:string,
    companyType?:string,
    logo:string | null | undefined,
}