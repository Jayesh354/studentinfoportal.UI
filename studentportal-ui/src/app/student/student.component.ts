import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Student } from '../models/ui-model/student.model';
import { StudentService } from './student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile'];
  dataSource: MatTableDataSource<Student>=new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString:string='';


  constructor(private studentSevice:StudentService) { }

  ngOnInit(): void {
    this.studentSevice.getStudent()
    .subscribe(
      (successResponse) => {

        this.student=successResponse;
        this.dataSource=new MatTableDataSource<Student>(this.student);

        if(this.matPaginator){
          this.dataSource.paginator=this.matPaginator;
        }

        if(this.matSort){
          this.dataSource.sort=this.matSort;
        }

    },
    (error)=>
    {
      console.log(error);

    });
  }
  filterStudent(){
    this.dataSource.filter=this.filterString.trim().toLocaleLowerCase();
  }

}