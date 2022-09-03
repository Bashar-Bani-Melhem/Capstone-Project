export interface Activity{
    id?:string,
    Name:string,
    Description:string,
    SkillsRequired:string[]|null|undefined, 
    StartDate:string,
    EndDate:string,
    Numberoftechnologistsrequired:number|null|undefined
}