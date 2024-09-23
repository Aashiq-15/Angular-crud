import { Component, Inject, inject, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import{MatRadioModule}from '@angular/material/radio';
import{MatSelectModule}from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';

interface education {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,



  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit {

  formGroup!: FormGroup;

  empForm:FormGroup;

  qualifications: education[] = [
    {value: 'O/L', viewValue: 'O/L'},
    {value: 'A/L', viewValue: 'A/L'},
    {value: 'Diploma', viewValue: 'Diploma'},
    {value: 'HND', viewValue: 'HND'},
    {value: 'Degree', viewValue: 'Degree'},
    {value: 'Post Graduate', viewValue: 'Post Gradute'},
  ];



  constructor(private _fb:FormBuilder,
    private _empServices:EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',

    });

  }

  ngOnInit(): void {
      this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){

      if(this.data){
        this._empServices
        .updateEmployee(this.data.id,this.empForm.value)
        .subscribe({
          next: (val: any) =>{
            alert('employee details updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.log(err);
          },
        });
      }else{
        this._empServices.addEmployee(this.empForm.value).subscribe({
          next: (val: any) =>{
            alert('employee addedd successfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.log(err);
          },
        });
      }


    }
  }
}
