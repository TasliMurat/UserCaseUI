import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  signUp(): void {
    // Implement signup logic here
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.authService
      .signUp(this.name, this.email, this.password)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/login']);
      });
  }
  isFormValid(): boolean {
    return !!this.name && !!this.email && !!this.password; // Returns true if all fields are filled
  }
}
