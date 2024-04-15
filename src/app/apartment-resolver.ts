import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApartmentServiceService } from "./apartment-service.service";
import { Apartment } from "./apartment.model";


export const ApartmentResolver: ResolveFn<any> = 
    (route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        apartmentService: ApartmentServiceService = inject(ApartmentServiceService)) :Observable<Apartment> => {


            const apartmentId = route.paramMap.get("apartmentId");

            if(apartmentId) {
                // make api call and get data for given apartment id
                return apartmentService.getApartment(Number(apartmentId));
            } else {
                // create and return empty apartment details

                const apartment: Apartment = {
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

                return of(apartment);

            }

        }