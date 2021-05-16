import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor(
    public _snackBar: MatSnackBar
  ) { }

  /**------------------------------------------------------------------------------------------------
   *    status: [success, info, warning, ...] (OBLIGATOIRE),
   *    message: message to display,
   *    action: message to display to close the snackbar
   *------------------------------------------------------------------------------------------------**/
  openSnackBar(status: string, message: string, action: string) {
    switch (status) {
      case 'success':
        this._snackBar.open(message, action, {
          panelClass: ['success-snackbar'],
          duration: 2500,
        })
        break;
      case 'warning':
        this._snackBar.open(message, action, {
          panelClass: ['warning-snackbar'],
          duration: 2500,
        })
        break;
      default:
        this._snackBar.open(message, action, {
          panelClass: ['info-snackbar'],
          duration: 2500,
        })
        break;
    }
  }
}
status