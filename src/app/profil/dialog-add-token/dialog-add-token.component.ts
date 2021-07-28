import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorTracker} from '../../shared/models/error-tracker';
import {DesignService} from '../../shared/services/design.service';

@Component({
  selector: 'app-dialog-add-token',
  templateUrl: './dialog-add-token.component.html',
  styleUrls: ['./dialog-add-token.component.scss']
})
export class DialogAddTokenComponent implements OnInit {

  user: User;
  addTokenForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAddTokenComponent>,
    private userService: UserService,
    private designService: DesignService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addTokenForm = new FormGroup({
      token : new FormControl(0, Validators.required)
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  onAddToken() {
    if (this.addTokenForm.valid && +this.addTokenForm.controls.token.value>10) {
      const token = this.addTokenForm.controls.token.value;
      this.userService.addToken(token).subscribe(
        (dataResult) => {
          console.log(dataResult);
          this.designService.openSuccessSnackBar("Ajout de jeton avec succès !!!");
        }, (error: ErrorTracker) => {
          const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
          this.designService.openErrorSnackBar(errors);
        }
      )
    } else {
      this.designService.openErrorSnackBar("Le montant à ajouter doit être supérieur ou égal à 10");
    }
  }
}
