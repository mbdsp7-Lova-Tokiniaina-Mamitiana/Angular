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
   * snackBarData = {
   *    status: [success, info, warning, ...] (OBLIGATOIRE),
   *    message: message to display,
   *    action: message to display to close the snackbar
   * }
   *------------------------------------------------------------------------------------------------**/
  _openSnackBar(snackBarData: any) {
    switch (snackBarData.status) {
      case 'success':
        this._snackBar.open(
          snackBarData.message,
          snackBarData.action, {
            panelClass: ['success-snackbar'],
            duration: 2500,
          }
        );
        break;
      case 'info':
        this._snackBar.open(
          snackBarData.message,
          snackBarData.action, {
            panelClass: ['info-snackbar'],
            duration: 3000,
          }
        );
        break;
      default:
        this._snackBar.open(
          snackBarData.message,
          snackBarData.action, {
            panelClass: ['warning-snackbar'],
            duration: 3500,
          }
        );
        break;
    }
  }

  openSnackBar(message: string, statut: string, action: string) {
    let snackBar = {
      snackBar: this._snackBar,
      message: message,
      action: action,
      status: statut
    }
    this._openSnackBar(snackBar);
  }

  openErrorSnackBar(message: string) {
    let snackBar = {
      snackBar: this._snackBar,
      message: message,
      action: "OK",
      status: "warning"
    }
    this._openSnackBar(snackBar);
  }

  openSuccessSnackBar(message: string) {
    let snackBar = {
      snackBar: this._snackBar,
      message: message,
      action: "OK",
      status: "success"
    }
    this._openSnackBar(snackBar);
  }

  openInfoSnackBar(message: string) {
    let snackBar = {
      snackBar: this._snackBar,
      message: message,
      action: "OK",
      status: "info"
    }
    this._openSnackBar(snackBar);
  }
}
