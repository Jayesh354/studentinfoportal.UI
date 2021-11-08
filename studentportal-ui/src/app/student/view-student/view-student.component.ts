import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-model/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId:string|null|undefined;
  student:Student={
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    mobile:'',
    profileImageUrl:'',
    dateOfBirth:'',
    gender:{
      id:'',
      description:'',
    },
    address:{
      id:'',
      studentId:'',
      postalAddress:'',
      physicalAddress:''
    }

  }

  constructor(private readonly studentService:StudentService,
    private readonly route:ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.studentId= params.get('id');
      }
    )
    if(this.studentId){
      this.studentService.getStudent(this.studentId).subscribe(
        (successResponse)=>{
            this.student= successResponse;
        },
        (error)=>{
          console.error(error);


        }
      )
    }
  }

}
