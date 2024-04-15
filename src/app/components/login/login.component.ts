import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { response } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

constructor(private authService: AuthServiceService,
             private router: Router){}

login(){
  this.authService.login(this.email, this.password).subscribe((response)=>{
    console.log(response);
    if(response.jwt){
      const jwt = response.jwt;
      localStorage.setItem('JWT', jwt);
      this.router.navigateByUrl("/apartment-list");
    }
  })
}

  isFormValid(): boolean {
    return !!this.email && !!this.password; // Returns true if all fields are filled
  }
}
