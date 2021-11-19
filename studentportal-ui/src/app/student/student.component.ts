import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/ui-model/student.model';
import { StudentService } from './student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  student: Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','edit','delete'];
  dataSource: MatTableDataSource<Student>=new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort;
  filterString:string='';


  constructor(private studentSevice:StudentService,
    private snackBar:MatSnackBar,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.studentSevice.getStudents()
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
  onDelete(studentId:string){
    // Get Student ID

    // Warning

    // Delete

    this.studentSevice.deleteStudent(studentId).subscribe(
      (successResponse)=>{

        console.log(successResponse);
        this.snackBar.open('Student Deleted !!',undefined,{duration:2000})
        setTimeout(()=>{
          window.location.reload()
          //this.router.navigate(['student'],{relativeTo:this.route});

        },2000)



      },
      (errorResponse)=>{

        console.error(errorResponse);

      }
    )
  }
}
