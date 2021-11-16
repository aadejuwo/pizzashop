// import {Injectable} from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// //we know that response will be in JSON format
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// @Injectable()
// export class ProfileService {

//     constructor(private http:HttpClient) {}

//     //Uses http.get() to request data based on student id 
// getProfile(profileId: string) {
//     return this.http.get('http://localhost:8000/profiles/'+ profileId);
// }
// //uses http.get() to load data 
// getProfiles() {
//     return this.http.get('http://localhost:8000/profiles/');
// }
//     deleteProfiles(profileId: string) {
//         this.http.delete("http://localhost:8000/profiles/" + profileId)
//             .subscribe(() => {
//                 console.log('Deleted: ' + profileId);
//             });
//             location.reload();
//     }
           

//     //Uses http.post() to post data 
//     addProfiles(
//         ContactName : string, 
//         ContactJobTitle : string,
//         ContactEmail : string,
//         ContactPhone :string,
//         CompanyName: string,
//         CompanyWebsite: string,
//         Street : string,
//         Zip : string,
//         City : string,
//         State : string,
//         ProjectTitle : string,
//         Question1: string,
//         Question2 : string,
//         Question3 : string,
//         Question4 : string,
//         Question5 : string
//         ) {
//         this.http.post('http://localhost:8000/profiles',{ 
//         ContactName,
//         ContactJobTitle,
//         ContactEmail,
//         ContactPhone,
//         CompanyName,
//         Street,
//         Zip,
//         City,
//         State,
//         CompanyWebsite,
//         ProjectTitle,
//         Question1,
//         Question2,
//         Question3,
//         Question4,
//         Question5
//      })
//         .subscribe((responseData) => {
//             console.log(responseData);
//         }); 
//         location.reload() 
//     }
//     updateProfile(
//         profileId: string,
//         ContactName : string, 
//         ContactJobTitle : string,
//         ContactEmail : string,
//         ContactPhone :string,
//         CompanyName: string,
//         CompanyWebsite: string,
//         Street : string,
//         Zip : string,
//         City : string,
//         State : string,
//         ProjectTitle : string,
//         Question1: string,
//         Question2 : string,
//         Question3 : string,
//         Question4 : string,
//         Question5 : string
        
//     )
//     {

//         this.http.put("http://localhost:8000/profiles/"+profileId,

//         {   profileId,
//             ContactName,
//             ContactJobTitle,
//             ContactEmail,
//             ContactPhone,
//             CompanyName,
//             Street,
//             Zip,
//             City,
//             State,
//             CompanyWebsite,
//             ProjectTitle,
//             Question1,
//             Question2,
//             Question3,
//             Question4,
//             Question5
//          })

//         .subscribe(() => {

//             console.log('Updated: ' + profileId);

//         });

//     }

//  }

