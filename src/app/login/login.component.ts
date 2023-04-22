import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = true;
  hide = true;
  firebaseErrorMessage: string;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
  
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.loginForm.value.email.hasError('required')) {
      return 'You must enter an email';
    }
    return this.loginForm.value.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getErrorMessagePwd() {
    return this.loginForm.value.password.hasError('required')
      ? 'You must enter a password'
      : '';
  }

  loginUser() {
    if (this.loginForm.invalid) console.log('something went wrong');

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          console.log('logging in...');
          this.router.navigate(['/home']); // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
        }
      });
  }
}
