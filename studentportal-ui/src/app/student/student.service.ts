import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl="https://localhost:44309";
  constructor(private httpClient:HttpClient) {

  }
  getStudents():Observable<Student[]>{



    return this.httpClient.get<Student[]>(this.baseApiUrl+'/Students')

  }
  getStudent(studentId:string):Observable<Student>{

    return this.httpClient.get<Student>(this.baseApiUrl+'/Students/'+studentId)
  }

  updateStudent(studentId:string,studentRequest:Student):Observable<Student>{

    const updateedStudentRequest:UpdateStudentRequest={
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      dateOfBirth:studentRequest.dateOfBirth,
      postalAddress:studentRequest.address.postalAddress,
      physicalAddress:studentRequest.address.physicalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl+'/students/'+studentId,updateedStudentRequest);

  }
}
