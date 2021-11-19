import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-model/gender.model';
import { Student } from 'src/app/models/ui-model/student.model';
import { GendersService } from 'src/app/services/genders.service';
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
    genderId:'',
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
  genderList:Gender[]=[];
  isNewStudent:boolean=false;
  header:string='';

  constructor(private readonly studentService:StudentService,
    private readonly route:ActivatedRoute,
    private readonly genderService:GendersService,
    private snackBar:MatSnackBar,
    private router:Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params)=>{
        this.studentId= params.get('id');

        if(this.studentId){

          if(this.studentId.toLocaleLowerCase()==='Add'.toLocaleLowerCase()){

            // Add New Student
            this.isNewStudent=true;
            this.header='Add New Student';

          }
          else{
            this.isNewStudent=false;
            this.header='Edit Student';

            // Edit Student
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

      }
    )
    this.genderService.getGenders().subscribe(
      (successResponse)=>{
       this.genderList = successResponse;
      },
      (error)=>{
        console.error(error);

      }
    );


  }

  onUpdate(){
    this.studentService.updateStudent(this.student.id,this.student).subscribe(
      (successResponse)=>{

        // Notification Success


        this.snackBar.open('Student updated successfully',undefined,{duration:2000});
        setTimeout(() => {
          this.router.navigateByUrl(`/student`);
        }, 2000);


      },
      (errorResponse)=>{

        // Log, or Error Notification.

        console.error(errorResponse);

        this.snackBar.open('Error occured!!!',undefined,
        {
          duration:3000
        });

      }
      )
  }
  onAddNew(){

    this.studentService.addNewStudent(this.student).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        this.snackBar.open('New Student added succsessfully..',undefined,{duration:2000});
        setTimeout(() => {
          this.router.navigateByUrl(`student/${successResponse.id}`);
        }, 2000);


      },
      (errorResponse)=>{
        console.log(errorResponse);

      }
      )

  }

}
