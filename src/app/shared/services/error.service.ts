import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ErrorTracker } from 'src/app/shared/models/error-tracker';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router) { }

  handleHttpError(error: HttpErrorResponse): Observable<ErrorTracker> {
    var dataError = new ErrorTracker();
    dataError.message = error.message;
    dataError.errorNumber = error.status;

    switch (error.status) {
      case 401:
        dataError.userMessage = "Vous n'avez pas l'autorisation pour accéder à cette page";
        this.router.navigateByUrl(`/`);
        break;
      case 500:
        dataError.userMessage = "Une erreur de serveur s'est produite";
      break;
      default:
        dataError.userMessage = "Une erreur s'est produite lors de la récupération des données";
        break;
    }
    
    return throwError(dataError);
  }
}
