import { Injectable } from '@angular/core';
import { IAdminRegister } from '../model/IAdminRegister';
import { IAdminLogin } from '../model/IAdminLogin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOtp } from '../model/IOtp';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceRoute = 'https://fwa-server-2.herokuapp.com/';
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }


  register(user: IAdminRegister): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/signup', user);
  }

  login(user: IAdminLogin): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/signin', user);
  }

  requestOtp(user: IAdminRegister): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/sendotp', user);
  }

  verifyOtp(otpData: IOtp): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/otpverify', otpData);
  }

  resendOtp(user: IAdminRegister): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/sendotp', user);
  }

  logout() {
    this.cookieService.delete('fwa-token');
    this.cookieService.deleteAll();
  }

  isLoggedIn(): boolean {
   // console.log(localStorage.getItem('key'));
    if(this.cookieService.get('fwa-token'))
      return true;
    return false;
  }

}
