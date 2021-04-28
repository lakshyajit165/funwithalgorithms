import { Component, OnInit } from '@angular/core';
import { IAdminRegister } from '../../model/IAdminRegister';
import { IOtp } from '../../model/IOtp';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  username: string = '';
  email: string = '';
  password: string = '';

  unamechangestatus: boolean = false;
  emailchangestatus: boolean = false;
  pwdchangestatus: boolean = false;
  formerrorstatus: boolean = false;
  formsubmiterror: boolean = false;
  formsubmiterrormsg: string = '';

  loading: boolean = false;
  otprequestloading: boolean = false;
  otpsendsuccess: boolean = false;
  otperror: string = '';
  otpverifysuccess: boolean = false;

  otpstring: string = '';
  otpData: IOtp = {
    email: '',
    otp: ''
  };

  admin: IAdminRegister = {
    email: '',
    username: '',
    password: '',
    roles: ["admin"]
  }

  msg: string = 'msg';

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

  emailChange(event): void {
    this.emailchangestatus = true;
  }

  validateEmail(): boolean {
    return this.email !== '';
  }

  routeToLoginPage() {
    this.router.navigate(['/portal/admin/login']);
  }

  onSubmit() {

    this.admin.email = this.email;
    this.admin.username = this.username;
    this.admin.password = this.password;


    if(this.validateEmail()  && this.validateUserName() && this.validatePassword()){
      this.formerrorstatus = false;

      // change loading to true
      this.loading = true;

      // change otperror message to empty string
      this.otperror = '';

      this.otpData.email = this.admin.email;  
      this.otpData.otp = this.otpstring;

      // first verify otp, on success, register user
      this.authService.verifyOtp(this.otpData).subscribe(res => {

        if(res[this.msg] === "You have been successfully registered!"){

            this.otpverifysuccess = true;
            // register user here
            // console.log(res);

            this.authService.register(this.admin).subscribe(res => {

              if(res['success']) {
                 // change loading status to false
                 this.loading = false;
      
                 // form submit error -> false
                 this.formsubmiterror = false;
      
                 // redirect to login
                this.router.navigate(['/portal/admin/login']);
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
              
              // console.log("ERROR in registering!", err);
              // change loading to false
              this.loading = false;

              this.otpverifysuccess = false;
      
              // set error message
              this.formsubmiterrormsg = 'An error occurred!';
      
              // form submit error-> true
              this.formsubmiterror = true;
            });
      
          
        } else {

            // console.log("ERROR in OTP", res);
            this.otperror = "Error verifying OTP! Please try again.."

            // change loading to false
            this.loading = false;

            this.otpverifysuccess = false;
    
            // set error message
            this.formsubmiterrormsg = 'An error occurred!';
    
            // form submit error-> true
            this.formsubmiterror = true;
        }
      })

     

     


    }else{
      // set loading to false
      this.loading = false;
      
      this.formerrorstatus = true;
    }

  }

  requestOtp() {


    this.admin.email = this.email;
    this.admin.username = this.username;
    this.admin.password = this.password;

    


    if(this.validateEmail()  && this.validateUserName() && this.validatePassword()){
      this.formerrorstatus = false;

      this.otprequestloading = true;

      this.authService.requestOtp(this.admin).subscribe(res => {
        // console.log(res);
        if(res[this.msg] === "OTP sent to super user!"){
          this.otpsendsuccess = true;
          this.otprequestloading = false;
        }else{
          this.otperror = res[this.msg];
        }
      })

    }else{
      // set otp loading to false
      
      this.otpsendsuccess = false;
      this.formerrorstatus = true;
    }
  }

  

}
