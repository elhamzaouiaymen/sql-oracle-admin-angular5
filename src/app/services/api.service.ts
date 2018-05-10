import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import {IProfile } from '../models/IProfile'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { IUser } from '../models/IUser';
import { ITablespace } from '../models/ITablespace';
const API_URL = environment.apiUrl;


@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  private handleError (error: Response | any) {
  console.error('ApiService::handleError', error);
  return Observable.throw(error);
}



    public getAllTableUsers() {
    
    return this.http
    .get(API_URL + '/users')
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
   
  }



//this method allows us to get tablespaces names
    public getAllTablespaces() {
    return this.http
    .get(API_URL + '/tablespaces')
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
   
  }

  public getProfiles(){
    return this.http
    .get(API_URL + '/profiles')
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
  }

  public createProfile(profile : IProfile){
    return this.http
    .post(API_URL + '/addprofile' , profile)
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
  }

  public createUser(user : IUser){
    return this.http
    .post(API_URL + '/adduser' , user)
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
  }


  public getAllUsers(){
    return this.http
    .get(API_URL + '/allusers')
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
  }


  
  public createTablespace(tablespace : ITablespace){
    return this.http
    .post(API_URL + '/addtablespace' , tablespace)
    .map(response => {
      return response.json();
      
    }).catch(this.handleError);
  }


}
