import { Component } from '@angular/core';
import { University } from 'src/app/IdentityAndAccessManagament/models/university';
import { PsychologistService } from '../services/login.service';
import { UniversityService } from 'src/app/IdentityAndAccessManagament/services/university.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  confirmEmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  telephone: string = '';
  universityId: string = '';
  universities: University[] = [];

  errorMessage: string = '';
  successMessage: string = '';
  formSubmitted = false;


  constructor(
    private psychologistService: PsychologistService,
    private universityService: UniversityService
  ) {}

  ngOnInit() {
    this.universityService.getAllUniversities().subscribe(universities => {
      this.universities = universities;
    });
  }

  validateFields(): boolean {
    if (!this.firstName.trim() || !this.lastName.trim() || !this.email.trim() || !this.confirmEmail.trim() ||
        !this.password || !this.confirmPassword || !this.telephone.trim() || !this.universityId) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return false;
    }

    if (this.email.trim() !== this.confirmEmail.trim()) {
      this.errorMessage = 'Los correos no coinciden.';
      return false;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return false;
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Formato de correo inválido.';
      return false;
    }

  
    const phonePattern = /^(\+51\s)?[0-9]{9}$/;
    if (!phonePattern.test(this.telephone)) {
      this.errorMessage = 'Número de teléfono inválido.';
      return false;
    }

    this.errorMessage = ''; 
    return true;
  }

  onSubmit() {
  this.formSubmitted = true; 

  if (this.validateFields()) {
    this.psychologistService.createPsychologist(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.telephone,
      this.universityId
    ).subscribe(() => {
      this.successMessage = 'Registro exitoso.';
      this.errorMessage = '';
      this.formSubmitted = false;

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.confirmEmail = '';
      this.password = '';
      this.confirmPassword = '';
      this.telephone = '';
      this.universityId = '';
    }, error => {
      this.errorMessage = 'Ocurrió un error al registrar. Intenta nuevamente.';
      this.successMessage = '';
    });
  }
}
isEmailValid(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

isPhoneValid(phone: string): boolean {
  const phonePattern = /^(\+51\s)?[0-9]{9}$/;
  return phonePattern.test(phone);
}


}
