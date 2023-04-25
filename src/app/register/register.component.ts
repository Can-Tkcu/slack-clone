import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  firebaseErrorMessage: string;
  loading: boolean = false;
  hide = true;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {    this.firebaseErrorMessage = '';
  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }


  signUp() {
    if (this.registerForm.invalid) return;
    this.authService
      .signupUser(this.registerForm.value)
      .then((result) => {
        if (result == null) {    // null is success
          this.router.navigate(['/home']);
        } 
        else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
      })
      .catch((err) => {
        console.log(err)
      });
  }
}