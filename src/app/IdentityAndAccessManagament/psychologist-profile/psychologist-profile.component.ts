import { Component } from '@angular/core';
import { PsychologistService } from 'src/app/user/services/login.service';
import { UpdatePsychologistResource } from '../models/psychologist-resource';

@Component({
  selector: 'app-psychologist-profile',
  templateUrl: './psychologist-profile.component.html',
  styleUrls: ['./psychologist-profile.component.css']
})
export class PsychologistProfileComponent {
  psychologistName: String;
  psychologistLastName: String;
  psychologistPhone: String;
  psychologistEmail: string;
  psychologistPassword: String;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private psychologistService: PsychologistService) { }

  ngOnInit(): void {
    const psychologist = this.psychologistService.getLoggedInPsychologist();
    if (psychologist) {
      this.psychologistName = psychologist.firstName;
      this.psychologistLastName = psychologist.lastName;
      this.psychologistPhone = psychologist.telephone;
      this.psychologistEmail = psychologist.email;
      this.psychologistPassword = psychologist.password;
    }
  }

  updateManagerProfile(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }
    const updateData: UpdatePsychologistResource = {
      firstName: this.psychologistName,
      lastName: this.psychologistLastName,
      email: this.psychologistEmail,
      password: this.newPassword || this.psychologistPassword,
      telephone: this.psychologistPhone
    };

    const psychologistId = this.psychologistService.getLoggedInPsychologist()?.id;
    const universityId = this.psychologistService.getLoggedInPsychologist()?.universityId;
    if (psychologistId && universityId) {
      this.psychologistService.updatePsychologist(psychologistId,universityId, updateData)
        .subscribe(response => {
          // handle the success response
          console.log('Psychologist updated successfully:', response);
          alert('El perfil ha sido actualizado exitosamente.');
          // Update the manager object in session storage
        const psychologist = this.psychologistService.getLoggedInPsychologist();
        if (psychologist) {
          psychologist.firstName = updateData.firstName;
          psychologist.lastName = updateData.lastName;
          psychologist.email = updateData.email;
          psychologist.password = updateData.password;
          psychologist.telephone = updateData.telephone;
          sessionStorage.setItem('loggedInPsychologist', JSON.stringify(psychologist));
        }
        }, error => {
          alert('Ocurrió un error al actualizar el perfil.')
          console.error('Error updating psychologist:', error);
        });
    } else {
      console.error("Psychologist ID is undefined.");
    }
  }
}
