import { Component, OnInit } from '@angular/core';
import { ApartmentServiceService } from '../../apartment-service.service';
import { Apartment } from '../../apartment.model';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-based-apartment-list',
  templateUrl: './user-based-apartment-list.component.html',
  styleUrl: './user-based-apartment-list.component.css'
})
export class UserBasedApartmentListComponent implements OnInit{

  dataSource: Apartment[] = [];
  user!: User;
  displayedColumns: string[] = [
    'adName',
    'apartmentName',
    'address',
    'area',
    'ageOfApartment',
    'numberOfBedrooms',
    'numberOfBathrooms',
    'floorLevel',
    'presenceOfBalcony',
    'edit',
    'delete',
  ];

  constructor(private apartmentService: ApartmentServiceService,
    private router: Router,
  private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.getUserApartmentList();
  }

  getUserApartmentList(): void {
    this.apartmentService.getUserApartments().subscribe({
      next: (res: Apartment[]) => {
        console.log("response", res);
        // Handle the user object here, e.g., assign it to a property in the component
        this.dataSource = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  updateApartment(apartmentId: number): void{
    console.log(apartmentId)
    this.router.navigate(['/apartment', {apartmentId:apartmentId}])
  }

  deleteApartment(apartmentId: number): void {
    console.log(apartmentId);
    this.apartmentService.deleteApartment(apartmentId).subscribe({
      next: (res) => {
        console.log(res);
        this.getUserApartmentList();
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

}
