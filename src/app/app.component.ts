import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { ServiceService } from './shared/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','dob','gender','education','company','exp','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private service: ServiceService,){}
  ngOnInit(): void {
    this.getAllEmployee()
  }

  openEmpAddEdit(){
   const DialogRef= this.dialog.open(EmpAddEditComponent)
   DialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getAllEmployee();
      }
    }
   })
  }
  editEmp(data:any){
    const DialogRef=this.dialog.open(EmpAddEditComponent,{
      data,
    });
    DialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getAllEmployee();
        }
      }
     });


  }

  getAllEmployee(){
    return this.service.getAllEmployee().subscribe({
      next:(res)=>{
       this.dataSource=new MatTableDataSource(res);
       this.dataSource

       this.dataSource.paginator=this.paginator


      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id:number){
    this.service.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert("Employee Deleted !")
        this.getAllEmployee();
      }

    })
  }
}