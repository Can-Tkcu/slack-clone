import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  firebaseErrorMessage:string;

  /**
   *
   */
  constructor(private authService: AuthService, private router: Router, private afAuth: Auth ) {
    this.firebaseErrorMessage = "";
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    })
  }

  signup() {
    if (this.registerForm.invalid)
      return;

      this.authService.signupUser(this.registerForm.value).then((result) => {
        if (result == null)                 // null is success
         this.router.navigate(['/home']);
         else if (result.isValid == false) 
         this.firebaseErrorMessage = result.message;
      }).catch(() => {
        //some handler
      })

  }

}
