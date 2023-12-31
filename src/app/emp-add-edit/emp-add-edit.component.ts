import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup;

  education: string[] = ['Graducate', 'Post Graducate', 'Matric', 'Diploma'];

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private dialogref: MatDialogRef<EmpAddEditComponent>,
    @Inject (MAT_DIALOG_DATA) public  data:any){

    this.empForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      exp: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data){
        this.service.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added Successfull');
            this.dialogref.close(true);
          }
        })

      }else{  this.service.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added Successfull');
          this.dialogref.close(true);
        }
      });
    }

      }

  }
}
