import { Component } from '@angular/core';
import { PsychologistService } from '../services/login.service';
import { Psychologist } from 'src/app/IdentityAndAccessManagament/models/psychologist';
import { ManagerService } from '../services/login-manager.service';
import { Manager } from 'src/app/IdentityAndAccessManagament/models/manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  role: string;
  errorMessage: string;


  constructor(private psychologistService: PsychologistService, private managerService: ManagerService, private router: Router,) { }

  login(): void {
    if (this.role === 'Psicólogo') {
      this.psychologistService.getPsychologistByEmailAndPasswordAndRole(this.email, this.password, this.role)
        .subscribe(
          (psychologist: Psychologist) => {
            this.psychologistService.setLoggedInPsychologist(psychologist);
            // Do something with the psychologist object returned by the API
            console.log(psychologist);
            this.router.navigate(['/results']);

          },
          (error) => {
            // Handle errors
            this.errorMessage = error.message;
            console.error(error);
          }
        );
    } else if (this.role === 'Manager') {
      this.managerService.getManagerByEmailAndPasswordAndRole(this.email, this.password, this.role)
        .subscribe(
          (manager: Manager) => {
            this.managerService.setLoggedInManager(manager);
            // Do something with the manager object returned by the API
            console.log(manager);
            this.router.navigate(['/students']);
          },
          (error) => {
            // Handle errors
            this.errorMessage = error.message;
            console.error(error);
          }
        );
    }
  }


}
