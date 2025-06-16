import { Component } from '@angular/core';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import { Manager } from '../models/manager';
import { University } from '../models/university';
import { UpdateManagerResource } from '../models/manager-resource';
import { UniversityService } from '../services/university.service';
import { UpdateUniversityResource } from '../models/university-resource';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent {
  managerName: String;
  managerLastName: String;
  managerPhone: String;
  managerEmail: string;
  managerPassword: String;
  universityName: String;
  universityCountry: String;
  universityCity: String ;
  universityAddress: string ;
  universityZip: String;
  universityRuc: String;
  newPassword: string;
  confirmNewPassword: string;

  constructor(private managerService: ManagerService, private universityService: UniversityService) { }

  ngOnInit(): void {
    const manager = this.managerService.getLoggedInManager();
    if (manager) {
      this.managerName = manager.firstName;
      this.managerLastName = manager.lastName;
      this.managerPhone = manager.telephone;
      this.managerEmail = manager.email;
      this.managerPassword = manager.password;
      this.universityName = manager.university?.name;
      this.universityCountry = manager.university?.country;
      this.universityCity = manager.university?.city;
      this.universityAddress = manager.university?.address;
      this.universityZip = manager.university?.zipCode;
      this.universityRuc = manager.university?.ruc;
    }
  }

  updateManagerProfile(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }
    const updateData: UpdateManagerResource = {
      firstName: this.managerName,
      lastName: this.managerLastName,
      email: this.managerEmail,
      password: this.newPassword || this.managerPassword,
      telephone: this.managerPhone
    };

    const managerId = this.managerService.getLoggedInManager()?.id;
    if (managerId) {
      this.managerService.updateManager(managerId, updateData)
        .subscribe(response => {
          console.log('Manager updated successfully:', response);
          alert('El perfil ha sido actualizado exitosamente.');
        const manager = this.managerService.getLoggedInManager();
        if (manager) {
          manager.firstName = updateData.firstName;
          manager.lastName = updateData.lastName;
          manager.email = updateData.email;
          manager.password = updateData.password;
          manager.telephone = updateData.telephone;
          sessionStorage.setItem('loggedInManager', JSON.stringify(manager));
        }
        }, error => {
          alert('Ocurrió un error al actualizar el perfil.')
          console.error('Error updating manager:', error);
        });
    } else {
      console.error("Manager ID is undefined.");
    }
  }

  updateUniversityProfile(): void {
    const updateData: UpdateUniversityResource = {
      name: this.universityName,
      address: this.universityAddress,
      city: this.universityCity,
      country: this.universityCountry,
      ruc: this.universityRuc,
      zipCode: this.universityZip
    };

    const universityId = this.managerService.getLoggedInManager()?.university.id;
    if (universityId) {
      this.universityService.updateUniversity(universityId, updateData)
        .subscribe(response => {
          console.log('Manager updated successfully:', response);
          alert('Los datos de la universidad han sido actualizados exitosamente.');
          const manager = this.managerService.getLoggedInManager();
          if (manager) {
            manager.university = response;
            sessionStorage.setItem('loggedInManager', JSON.stringify(manager));
          }
        }, error => {
          alert('Ocurrió un error al actualizar los datos de la universidad.')
          console.error('Error updating manager:', error);
        });
    } else {
      console.error("Manager ID is undefined.");
    }
  }

}
