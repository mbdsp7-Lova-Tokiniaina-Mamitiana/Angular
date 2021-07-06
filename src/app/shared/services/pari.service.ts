import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorService} from './error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PariService {

  private readonly api = environment.node_endpoint;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  getAll() {
    return this.http.get<any>(`${this.api}/paris`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }

  getById(id_pari: number) {
    return this.http.get<any>(`${this.api}/pari/${id_pari}`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }
}
