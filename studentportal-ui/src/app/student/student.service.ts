import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) {

  }
  getStudent():Observable<Student[]>{

    const baseApiUrl="https://localhost:44309";

    return this.httpClient.get<Student[]>(baseApiUrl+'/Students')

  }
}
