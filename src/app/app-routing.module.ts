import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddAlgoComponent } from './components/add-algo/add-algo.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { EditComponent } from './components/edit/edit.component';
import { GuestViewAlgoComponent } from './components/guest-view-algo/guest-view-algo.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SingleAlgoComponent } from './components/single-algo/single-algo.component';
import { ViewAlgoComponent } from './components/view-algo/view-algo.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './services/auth.guard';
import { AuthRouteGuard } from './services/authroute.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/welcome'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'welcome', component: LandingComponent, 
      },
      {
        path: 'about', component: AboutComponent, 
      },
      {
        path: 'algorithms', component: GuestViewAlgoComponent
      },
      {
        path: 'algorithms/:id', component: SingleAlgoComponent
      }
      
    ]  

  },
  {
    path: 'portal/admin/login',
    component: LoginComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'portal/admin/register',
    component: RegisterComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'portal/admin/home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: AdminDashboardComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'add-algo', component: AddAlgoComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'algorithms', component: ViewAlgoComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'algorithms/:id', component: SingleAlgoComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'algorithms/edit/:id', component: EditComponent, canActivateChild: [AuthGuard]
      }
    ]
  }, 
  {
    path: '**',
    component: PagenotfoundComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
