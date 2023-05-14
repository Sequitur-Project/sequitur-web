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
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  confirmPassword:string;
  password: string;
  telephone: string;
  universityId: string;
  universities: University[];

  constructor(private psychologistService: PsychologistService, private universityService: UniversityService) {}

  ngOnInit() {
    this.universityService.getAllUniversities().subscribe(universities => {
      this.universities = universities;
      console.log(this.universities);

    });
  }
  validateFields(): boolean {
    if (this.password.valueOf !== this.confirmPassword.valueOf) {
      alert('La contraseña no coincide con su confirmación');
      return false;
    }

    if (this.email.valueOf !== this.confirmEmail.valueOf) {
      alert('El correo no coincide con su confirmación');
      return false;
    }

    return true;
  }


  onSubmit() {
    if (this.validateFields()) {
      this.psychologistService.createPsychologist(this.firstName, this.lastName, this.email, this.password, this.telephone, this.universityId).subscribe(() => {
        // handle success
      }, error => {
        // handle error
      });
    }
  }

}
