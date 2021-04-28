import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddAlgoComponent } from './components/add-algo/add-algo.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FormsModule } from '@angular/forms';
import { MarkdownPipe } from './markdown.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { AuthRouteGuard } from './services/authroute.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ViewAlgoComponent } from './components/view-algo/view-algo.component';
import { Data } from './providers/data.provider';
import { AlgoCategory } from './providers/algocategory.provider';
import { SingleAlgoComponent } from './components/single-algo/single-algo.component';
import { EditComponent } from './components/edit/edit.component';
import { ChartsModule } from 'ng2-charts';
import { GuestViewAlgoComponent } from './components/guest-view-algo/guest-view-algo.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    AddAlgoComponent,
    AdminHomeComponent,
    MarkdownPipe,
    AdminDashboardComponent,
    ViewAlgoComponent,
    SingleAlgoComponent,
    EditComponent,
    GuestViewAlgoComponent,
    PagenotfoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [AuthGuard, AuthRouteGuard, Data, AlgoCategory, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
