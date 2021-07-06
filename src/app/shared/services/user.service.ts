import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ErrorService} from './error.service';
import {catchError, map} from 'rxjs/operators';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly node_endpoint: string = environment.node_endpoint + '/users';
  private readonly grails_endpoint: string = environment.grails_endpoint + '/users';
  private headersContent: any = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  public userLogged = new BehaviorSubject<User | null>(null);

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ) {
    }

    login(paramsLogin: any): Observable<any> {
        return this.http.post<any>(`${this.node_endpoint}/login`, paramsLogin, {headers: this.headersContent})
            .pipe(
                map(response => {
                  const user = response.connected;
                  this.userLogged.next(user);
                  const userInfo = {
                    _id: user._id,
                    login: user.login,
                    email: user.email,
                    role: user.role
                  }
                  localStorage.setItem("_userInfo_", JSON.stringify(userInfo));
                  return response;
                }),
              catchError(err => this.errorService.handleHttpError(err))
            );
    }

    register(newUserParams: any): Observable<any> {
        return this.http.post<any>(`${this.node_endpoint}/register`, newUserParams, {headers: this.headersContent})
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }

    isLoggedIn() {
      const userValue = localStorage.getItem("_userInfo_");
      return (userValue != null);
    }

    signOut() {
      localStorage.removeItem("_userInfo_");
      window.location.reload();
    }

    getCurrentUser(){
      return JSON.parse(localStorage.getItem("_userInfo_")!);
    }

    decodeToken(token: string): any {
        return jwt_decode(token);
    }

    profil() {
        const userInfo = JSON.parse(localStorage.getItem("_userInfo_")!);
        return this.http.get<any>(`${this.grails_endpoint}/profil?id=${userInfo._id}`)
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }
}
