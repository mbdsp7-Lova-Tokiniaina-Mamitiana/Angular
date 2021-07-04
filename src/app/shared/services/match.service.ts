import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly api = environment.endpoint;
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getAll() {
    return this.http.get<any>(`${this.api}/matchs`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }

  getById(idMatch: string) {
    return this.http.get<any>(`${this.api}/match/${idMatch}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }
}
