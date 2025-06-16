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
  role: string = '';
  errorMessage: string;


  constructor(private psychologistService: PsychologistService, private managerService: ManagerService, private router: Router,) { }

  login(): void {
  if (!this.email || !this.password || !this.role) {
    this.errorMessage = 'Por favor completa todos los campos.';
    return;
  }

  if (!this.validateEmail(this.email)) {
    this.errorMessage = 'El correo ingresado no es válido.';
    return;
  }

  if (this.password.length < 6) {
    this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }
    if (this.role === 'Psicólogo') {
      this.psychologistService.getPsychologistByEmailAndPasswordAndRole(this.email, this.password, this.role)
        .subscribe(
          (psychologist: Psychologist) => {
            this.psychologistService.setLoggedInPsychologist(psychologist);
            console.log(psychologist);
            this.router.navigate(['/homePsychologist']);

          },
          (error) => {
            this.errorMessage = "Correo o contraseña incorrectos.";
            console.error(error);
          }
        );
    } else if (this.role === 'Manager') {
      this.managerService.getManagerByEmailAndPasswordAndRole(this.email, this.password, this.role)
        .subscribe(
          (manager: Manager) => {
            this.managerService.setLoggedInManager(manager);
            console.log(manager);
            this.router.navigate(['/home']);
          },
          (error) => {
            this.errorMessage = "Correo o contraseña incorrectos.";
            console.error(error);
          }
        );
    }
  }

validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}


}
