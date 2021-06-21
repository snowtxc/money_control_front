import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

//GUARDS
import { IsLoggedGuard } from './guards/isLogged/is-logged.guard';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { OperationsComponent } from './components/shared/operations/operations.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    OperationsComponent,
    HeaderComponent,
    FilterComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwPaginationModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true   
    },
    IsLoggedGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
