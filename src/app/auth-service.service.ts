import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const api = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(api + '/auth/login', { email, password });
  }

  logout(): void {
    localStorage.removeItem('JWT');
  }

  signUp(name: string, email: string, password: string): Observable<any> {
    console.log('service ogu: ', name);
    return this.http.post<any>(api + '/auth/signup', {
      email,
      password,
      fullName: name,
    });
  }

  getUserByJwt(): Observable<any> {
    return this.http.get<any>(api + '/api/users/profile', {
      headers: this.createAuthorizationHeader(),
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('JWT');
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
