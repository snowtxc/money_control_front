import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from "@components/home/home.component";
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';

//Guards
import { IsLoggedGuard } from './guards/isLogged/is-logged.guard';


const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HomeComponent, canActivate: [IsLoggedGuard] },
{ path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
