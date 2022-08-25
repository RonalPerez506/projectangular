import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Post } from './post';
    
@Injectable({
  providedIn: 'root'
})
export class PostService {
    
  private apiURL = "http://192.168.1.23:8000/api";

  // private apiURL = "https://jsonplaceholder.typicode.com";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/clients')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(post: any): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/clients', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: any): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/clients' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: any, post: any): Observable<Post> {
    console.log("----------------error 1----------------------");
    return this.httpClient.put<Post>(this.apiURL + '/clients/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    console.log("----------------url api----------------------");
  }
    
  delete(id: any){
    return this.httpClient.delete<Post>(this.apiURL + '/clients' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  
     
   
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}