import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorService} from './error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private readonly api = environment.node_endpoint;
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }


  getAll(page?: number, limit?: number) {
    let url: string;
    if (page && limit) {
      url = `${this.api}/matchs?page=${page}&limit=${limit}`;
    } else {
      url = `${this.api}/matchs`;
    }
    return this.http.get<any>(url)
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
