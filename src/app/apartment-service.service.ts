import { Injectable } from '@angular/core';
import { Apartment } from './apartment.model';
import { Observable, switchMap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { User } from './user.model';





@Injectable({
  providedIn: 'root'
})
export class ApartmentServiceService {

  api = "http://localhost:8080/apartments";
  user: any;
  constructor(private httpClient: HttpClient,
    private authService: AuthServiceService) { }

  
  public saveApartment(apartment: Apartment): Observable<Apartment>{
    return this.httpClient.post<Apartment>(`${this.api}/save/apartment`, apartment, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllApartments(): Observable<any> {
    return this.httpClient.get(this.api, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getUserApartments(): Observable<any> {
    return this.authService.getUserByJwt().pipe(
      switchMap((user: User) => {
        console.log(user.id); // Now user.id should be defined
        return this.httpClient.get(this.api + "/get/userApartments/" + user.id, {
          headers: this.createAuthorizationHeader(),
        });
      })
    );
  }
  

  public deleteApartment(apartmentId: number): Observable<any>{
      return this.httpClient.get(`${this.api}/delete/apartment/${apartmentId}`, {
        headers: this.createAuthorizationHeader(),
      });
  }

  public getApartment(apartmentId: number){
    return this.httpClient.get<Apartment>(`${this.api}/get/apartment/${apartmentId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  public updateApartment(apartment: Apartment, apartmentId:number){
    
    return this.httpClient.put<Apartment>(`${this.api}/update/apartment/${apartmentId}`, apartment, {
      headers: this.createAuthorizationHeader(),
    })
  }

  createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log('JWT token not found in the local storage');
    }
    return new HttpHeaders();
  }
}
