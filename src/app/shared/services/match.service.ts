import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ErrorService} from './error.service';
import {catchError} from 'rxjs/operators';
import * as mapboxgl from 'mapbox-gl';
import {mapboxConfig} from '../constant';

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


  getAll(params) {
    let url: string = `${this.api}/matchs/search`;
    return this.http.post<any>(url, params)
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

  viewMap(mapboxContent:any, longitude: number, latitude: number, mapCard: ElementRef) {
    mapboxContent = new mapboxgl.Map({
      container: mapCard.nativeElement,
      style: mapboxConfig.style,
      zoom: 13,
      center: [longitude, latitude],
      accessToken: mapboxConfig.accessToken
    });
    mapboxContent.addControl(new mapboxgl.NavigationControl());
    new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapboxContent);
  }

  getMatchCount() {
    return this.http.get<any>(`${this.api}/matchsCount`)
      .pipe(
        catchError(err => this.errorService.handleHttpError(err))
      );
  }
}
