import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpoint: string = environment.endpoint+"/api/users";
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  private headersContent: any = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  login(paramsLogin: any) {
    return this.http.post<any>(`${this.endpoint}/auth`, paramsLogin, { headers: this.headersContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  register(newUserParams: any) {
    return this.http.post<any>(`${this.endpoint}/register`, newUserParams, { headers: this.headersContent })
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      )
  }

  logOut() {
    return null;
  }

  getUserProfil(userId: string) {
    let user = new User("Fivintich77","MarcMChamberlin@fleckens.hu",1);
    return user;
  }
}
