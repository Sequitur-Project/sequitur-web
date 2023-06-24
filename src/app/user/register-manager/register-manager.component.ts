import { Component } from '@angular/core';
import { University } from 'src/app/IdentityAndAccessManagament/models/university';
import { PsychologistService } from '../services/login.service';
import { UniversityService } from 'src/app/IdentityAndAccessManagament/services/university.service';
import { ManagerService } from '../services/login-manager.service';
import {  SaveManager } from 'src/app/IdentityAndAccessManagament/models/save-manager-resource';
import { UpdateUniversityResource } from 'src/app/IdentityAndAccessManagament/models/university-resource';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent {
  manager: SaveManager = new SaveManager();
  university: UpdateUniversityResource = new UpdateUniversityResource();
  isLoading = false;
  confirmEmail: string;
  confirmPassword:string;

  constructor(private managerService: ManagerService, private universityService: UniversityService) {}

  ngOnInit() {

  }
  validateFields(): boolean {
    if (this.manager.password.valueOf !== this.confirmPassword.valueOf) {
      alert('La contraseña no coincide con su confirmación');
      return false;
    }

    if (this.manager.email.valueOf !== this.confirmEmail.valueOf) {
      alert('El correo no coincide con su confirmación');
      return false;
    }

    return true;
  }


  onSubmit() {
    if (this.validateFields()) {
    this.isLoading = true;
    this.manager.university = this.university;
    this.managerService.createManager(this.manager)
    .subscribe(
      (response) => {
        console.log('Manager created successfully', response);
        // Reset form or perform any other actions
        this.manager = new SaveManager();
        this.university = new UpdateUniversityResource();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error creating manager', error);
        // Handle error scenario
        this.isLoading = false;
      }
    );
    }
  }
}
