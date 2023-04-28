import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ChannelContentComponent } from './channel-content/channel-content.component';
import { DirectMessagesComponent } from './direct-messages/direct-messages.component';
import { DirectMessagesContentComponent } from './direct-messages-content/direct-messages-content.component';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard], 
    children: [
      {
        path: 'channel/:id', 
        component: ChannelContentComponent
      },
      {
        path: 'direct-messages/:id', 
        component: DirectMessagesContentComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
