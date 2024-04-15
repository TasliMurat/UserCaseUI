import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentResolver } from './apartment-resolver';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserBasedApartmentListComponent } from './components/user-based-apartment-list/user-based-apartment-list.component';

const routes: Routes = [
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: "",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'apartment',
    component: ApartmentComponent,
    resolve: { apartment: ApartmentResolver },
  },
  {
    path: 'apartment-list',
    component: ApartmentListComponent,
  },
  {
    path: 'userApartments',
    component: UserBasedApartmentListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
