import { Component } from '@angular/core';
import { Manager } from 'src/app/IdentityAndAccessManagament/models/manager';
import { ManagerService } from 'src/app/user/services/login-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedInManager: Manager | undefined;

  constructor(private psychologistService: ManagerService) {}

  ngOnInit() {
    this.loggedInManager = this.psychologistService.getLoggedInManager();
  }
}
