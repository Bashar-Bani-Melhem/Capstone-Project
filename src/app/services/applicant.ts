export interface applicant{
    id?:string,
    applicantId:string,
    activityId:string,
    applicantName:string,
    approved:boolean,
    whyAppling:string,
    whatCanVolunteer:string,
    range:{
        StartDate?:any|null|undefined,
        EndDate?:any|null|undefined, 
     },
    logo:string | null | undefined,

}