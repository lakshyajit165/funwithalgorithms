import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdminLogin } from '../../model/IAdminLogin';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  unamechangestatus: boolean = false;
  pwdchangestatus: boolean = false;
  formerrorstatus: boolean = false;
  formsubmiterror: boolean = false;
  formsubmiterrormsg: string = '';
  loading: boolean = false;
  accesstoken: string = '';

  admin: IAdminLogin = {
    username: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  userNameChange(event): void {
    this.unamechangestatus = true;
  }

  validateUserName(): boolean {
    return this.username !== '' && this.username.length >= 5 && this.username.length <= 10;
  }

  passwordChange(event): void {
    this.pwdchangestatus = true;
  }

  validatePassword(): boolean {
    return this.password !== '' && this.password.length >= 8;
  }

  routeToRegisterPage() {
    this.router.navigate(['/portal/admin/register'])
  }

  onSubmit() {

    this.admin.username = this.username;
    this.admin.password = this.password;

    if(this.validateUserName() && this.validatePassword()) {

      // set loading to true
      this.loading = true;

      // set formerrorstatus to false
      this.formerrorstatus = false;

      this.authService.login(this.admin).subscribe(res => {

        if(res['success']){
          
          // set loading to false
          this.loading = false;

          // collect and store the token in cookie
          this.accesstoken = res['accessToken'];
          // localStorage.setItem('fwa-token', this.accesstoken);
          this.cookieService.set('fwa-token', this.accesstoken);

          // redirect to add algo page
          this.router.navigate(['/portal/admin/home']);

        }else{
           // change loading status to false
           this.loading = false;

           // form submit error -> true
           this.formsubmiterror = true;
           
           // assign the error message
           if(res['message']){
           
             this.formsubmiterrormsg = res['message'];
           
           }else{
            
             this.formsubmiterrormsg = 'An error occurred!';
           
           }
        }
      },
      err => {

        // change loading to false
        this.loading = false;

        // set error message
        this.formsubmiterrormsg = 'An error occurred!';

        // form submit error-> true
        this.formsubmiterror = true;
        
      });

    }else{
      // set loading to false
      this.loading = false;
      this.formerrorstatus = true;

    }
  }

  
}
