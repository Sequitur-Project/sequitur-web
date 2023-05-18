import { Component } from '@angular/core';
import { ManagerService } from 'src/app/user/services/login-manager.service';
import { PsychologistService } from 'src/app/user/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  loggedInPsychologist: any;
  loggedInManager: any;

  constructor(private psychologistService: PsychologistService, private managerService: ManagerService) {}

  ngOnInit(): void {
    this.updateLoginState();
  }
  updateLoginState(): void {
    this.loggedInPsychologist = this.psychologistService.getLoggedInPsychologist();
    this.loggedInManager = this.managerService.getLoggedInManager();
  }
  getRole(): string {
    if (this.loggedInPsychologist && !this.loggedInManager) {
      return 'Psicólogo';
    } else if (!this.loggedInPsychologist && this.loggedInManager) {
      return 'Manager';
    } else {
      return '';
    }
  }

  logout(): void {
    this.psychologistService.logout();
    this.managerService.logout();
    this.updateLoginState(); // Update login state after logout
  }
}
