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
    const appointmentData = new Appointment(); // create an instance of the Appointment class
  appointmentData.psychologistId = psychologistId!; // assign the psychologistId
  appointmentData.studentId = this.studentId; // assign the studentId
  // convert the appointmentDate string value to a Date object before assigning it to the appointmentData object
  appointmentData.appointmentDate = new Date(this.appointmentForm.get('appointmentDate')!.value ?? new Date());
  appointmentData.appointmentTime = this.appointmentForm.get('appointmentTime')!.value as string; // assign the appointmentTime from the form
  appointmentData.appointmentLocation = this.appointmentForm.get('appointmentLocation')!.value as string; // assign the appointmentLocation from the form
  appointmentData.reason = this.appointmentForm.get('reason')!.value as string; // assign the reason from the form
  appointmentData.accepted = false; // set accepted to false
    // handle the save action
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
    // handle the cancel action
    this.dialogRef.close();
  }

}
