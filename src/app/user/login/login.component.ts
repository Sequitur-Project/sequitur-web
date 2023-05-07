import { Component } from '@angular/core';
import { PsychologistService } from '../services/login.service';
import { Psychologist } from 'src/app/IdentityAndAccessManagament/models/psychologist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private psychologistService: PsychologistService) { }

  login(): void {
    this.psychologistService.getPsychologistByEmailAndPassword(this.email, this.password)
      .subscribe(
        (psychologist: Psychologist) => {
          this.psychologistService.setLoggedInPsychologist(psychologist);
          // Do something with the psychologist object returned by the API
          console.log(psychologist);
        },
        (error) => {
          // Handle errors
          this.errorMessage = error.message;
          console.error(error);
        }
      );
  }

  logout(): void {
    this.psychologistService.logout();
  }

}
