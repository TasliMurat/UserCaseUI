import { Component, OnInit } from '@angular/core';
import { Apartment } from '../../apartment.model';
import { NgForm } from '@angular/forms';
import { ApartmentServiceService } from '../../apartment-service.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css',
})
export class ApartmentComponent implements OnInit {
  apartment: any;
  isCreateApartment: boolean = true;
  constructor(
    private apartmentService: ApartmentServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.apartment = this.activatedRoute.snapshot.data['apartment'];
    console.log("apartment:", this.apartment.id);
    if (this.apartment && this.apartment.id > 0) {
      this.isCreateApartment = false;
      console.log(this.isCreateApartment);
    } else {
      this.isCreateApartment = true;
      console.log(this.isCreateApartment);
    }
  }

  balconyAvailability(state: boolean): void {
    this.apartment.presenceOfBalcony = state;
  }
  saveApartment(apartmentForm: NgForm): void {
    if (this.isCreateApartment) {
      this.apartmentService.saveApartment(this.apartment).subscribe({
        next: (res: Apartment) => {
          console.log(res);
          apartmentForm.reset();
          this.apartment.presenceOfBalcony = null;
          this.router.navigate(['/apartment-list']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.apartmentService
        .updateApartment(this.apartment, this.apartment.id)
        .subscribe({
          next: (res: Apartment) => {
            this.router.navigate(['/apartment-list']);
            console.log("update e girildi");
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          },
        });
    }
  }

  clearForm(form: NgForm): void {
    form.resetForm(); // Reset the form
    this.apartment = {
      // Reset the apartment object
      id: null,
      adName: '',
      address: '',
      area: null,
      ageOfApartment: null,
      apartmentName: '',
      numberOfBedrooms: null,
      numberOfBathrooms: null,
      floorLevel: null,
      presenceOfBalcony: null,
    };
  }
}
