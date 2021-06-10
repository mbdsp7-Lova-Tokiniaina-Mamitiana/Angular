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

  getAll(params:any) {
    return this.http.post<any>(`${this.api}/matchs/search`, params)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }
}
