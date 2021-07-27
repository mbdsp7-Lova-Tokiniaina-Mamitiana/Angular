import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DesignService} from '../shared/services/design.service';
import {UserService} from '../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {NewUserComponent} from '../new-user/new-user.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private userService: UserService,
    public designService: DesignService,
    private router: Router,
    private _dialog: MatDialog
  ) {
    this.authForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

    onLogin(): void {
        if (this.authForm.valid) {
            this.userService.login(this.authForm.value).subscribe(
                (loggedData) => {
                    if (loggedData.auth && loggedData.token) {
                        console.log('User logged in');
                        localStorage.setItem('token', loggedData.token);
                        localStorage.setItem('isLogged', 'true');
                        window.location.reload();
                    } else {
                        this.designService.openSnackBar('warning', 'Une erreur s\'est produite, rééssayez plus tard', 'OK');
                    }
                }
            );
        } else {
            this.designService.openSnackBar('warning', 'Veuillez bien renseigner les informations nécessaires', 'OK');
        }
    }

  onSignUp() {
    const dialogRef = this._dialog.open(NewUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
