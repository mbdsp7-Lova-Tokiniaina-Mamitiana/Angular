import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

    private readonly node_endpoint: string = environment.node_endpoint;
  constructor(
      private http: HttpClient,
      private errorService: ErrorService,
  ) { }

    getAll(page?: number, limit?: number) {
        let url: string;
        if (page && limit) {
            url = `${this.node_endpoint}/equipes?page=${page}&limit=${limit}`;
        } else {
            url = `${this.node_endpoint}/equipes`;
        }
        return this.http.get<any>(url)
            .pipe(
                catchError(err => this.errorService.handleHttpError(err))
            );
    }
}
