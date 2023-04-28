import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(public usersService: UsersService) {
    
  }
  ngOnInit(): void {
    this.usersService.getAllUsers()
    this.usersService.getCurrentUser()
  }
  
  

}
