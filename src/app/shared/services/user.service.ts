import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ErrorService} from './error.service';
import {catchError} from 'rxjs/operators';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private readonly endpoint: string = environment.endpoint + '/api/users';
  private headersContent: any = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  public isLogged = new BehaviorSubject<User>(new User('', '', ''));

    constructor(
        private http: HttpClient,
        private errorService: ErrorService
    ) {
    }

    login(paramsLogin: any): Observable<any> {
        return this.http.post<any>(`${this.endpoint}/login`, paramsLogin, {headers: this.headersContent})
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }

    register(newUserParams: any): Observable<any> {
        return this.http.post<any>(`${this.endpoint}/register`, newUserParams, {headers: this.headersContent})
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }

    logOut(): any {
        return this.http.post<any>(`${this.endpoint}/logout`, {headers: this.headersContent})
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }

    getCurrentUser(): Observable<any> {
        return this.http.get<any>(`${this.endpoint}/login`, {headers: this.headersContent})
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }

    getUserProfil(userId: string): User {
        return new User('Fivintich77', 'MarcMChamberlin@fleckens.hu', '');
    }

    decodeToken(token: string): any {
        return jwt_decode(token);
    }
}
