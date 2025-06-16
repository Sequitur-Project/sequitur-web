import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../services/appointment.service';
import { PsychologistService } from 'src/app/user/services/login.service';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointmentForm = new FormGroup({
    appointmentDate: new FormControl('', Validators.required),
    appointmentTime: new FormControl('', Validators.required),
    appointmentLocation: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
  });
  studentId: string;

  constructor(
    public dialogRef: MatDialogRef<AppointmentComponent>,
    private appointmentService: AppointmentService,
    private psychologistService: PsychologistService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.studentId = this.data.studentId;
  }

  onSave(): void {
    const psychologistId = this.psychologistService.getLoggedInPsychologist()?.id;
    const appointmentData = new Appointment();
  appointmentData.psychologistId = psychologistId!;
  appointmentData.studentId = this.studentId; 
  appointmentData.appointmentDate = new Date(this.appointmentForm.get('appointmentDate')!.value ?? new Date());
  appointmentData.appointmentTime = this.appointmentForm.get('appointmentTime')!.value as string;
  appointmentData.appointmentLocation = this.appointmentForm.get('appointmentLocation')!.value as string; 
  appointmentData.reason = this.appointmentForm.get('reason')!.value as string; 
  appointmentData.accepted = false; 
    this.appointmentService.createAppointment(psychologistId!, this.studentId, appointmentData)
    .subscribe(
      (response) => {
        console.log('Appointment created successfully:', response);
        this.dialogRef.close();
      },
      (error) => {
        console.log('Error creating appointment:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
