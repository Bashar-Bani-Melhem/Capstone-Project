export interface Volunteer{
    id:string,
    fullName:string,
    emailAddress:string,
    phoneNumber:number|null|undefined,
    password?:string,
    confirmPassword?:string,
    city:string,
    skills:string[]|null|undefined,
    jobExperiences:string,
    Courses:string|null|undefined,
    availableTimes:string|null|undefined,
}