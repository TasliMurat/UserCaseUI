import { Component, OnInit } from '@angular/core';
import { ApartmentServiceService } from '../../apartment-service.service';
import { Apartment } from '../../apartment.model';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.css',
})
export class ApartmentListComponent implements OnInit {
  dataSource: Apartment[] = [];
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
  ];

  constructor(private apartmentService: ApartmentServiceService,
    private router: Router,
  private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.getApartmentList();
  }

  getApartmentList(): void {
    this.apartmentService.getAllApartments().subscribe({
      next: (res: Apartment[]) => {
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
        this.getApartmentList();
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
