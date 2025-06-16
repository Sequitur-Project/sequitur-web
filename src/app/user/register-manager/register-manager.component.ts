import { Component } from '@angular/core';
import { University } from 'src/app/IdentityAndAccessManagament/models/university';
import { PsychologistService } from '../services/login.service';
import { UniversityService } from 'src/app/IdentityAndAccessManagament/services/university.service';
import { ManagerService } from '../services/login-manager.service';
import { SaveManager } from 'src/app/IdentityAndAccessManagament/models/save-manager-resource';
import { UpdateUniversityResource } from 'src/app/IdentityAndAccessManagament/models/university-resource';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent {
  manager: SaveManager = new SaveManager();
  university: UpdateUniversityResource = new UpdateUniversityResource();

  confirmEmail: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  formSubmitted: boolean = false;

  constructor(
    private managerService: ManagerService,
    private universityService: UniversityService
  ) {}

  validateFields(): boolean {
    if (
      !this.manager.firstName || !this.manager.lastName || !this.manager.email ||
      !this.confirmEmail || this.manager.email !== this.confirmEmail ||
      !this.manager.password || !this.confirmPassword || this.manager.password !== this.confirmPassword ||
      !this.manager.telephone ||
      !this.university.name || !this.university.country || !this.university.city ||
      !this.university.address || !this.university.zipCode || !this.university.ruc
    ) {
      return false;
    }

    return true;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (!this.validateFields()) {
      return;
    }

    this.isLoading = true;
    this.manager.university = this.university;

    this.managerService.createManager(this.manager).subscribe({
      next: (response) => {
        console.log('Manager created successfully', response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating manager', error);
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.manager = new SaveManager();
    this.university = new UpdateUniversityResource();
    this.confirmEmail = '';
    this.confirmPassword = '';
    this.formSubmitted = false;
    this.isLoading = false;
  }

  isPhoneInvalid(): boolean {
  const phone = this.manager.telephone || '';
  return phone.length < 9;
}


}
