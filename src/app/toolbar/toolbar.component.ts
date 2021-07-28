import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthComponent} from '../auth/auth.component';
import {ErrorTracker} from '../shared/models/error-tracker';
import { DesignService } from '../shared/services/design.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  loggedUser: User = new User('', '', '');
  token: any;
  solde: number = 0;


  constructor(
    private router: Router,
    private userService: UserService,
    private _dialog: MatDialog,
    private designService: DesignService
  ) {
  }

  ngOnInit(): void {
    // TOKEN , GET CURRENT USER
    if (this.userService.isLoggedIn()) {
      this.loggedUser = this.userService.getCurrentUser();
      this.userService.profil().subscribe(
        (user) => {
          this.solde = user.solde;
        }, (error: ErrorTracker) => {
          const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
          this.designService.openErrorSnackBar(errors);
        }
      )
    } else {
      this.router.navigateByUrl(`/`);
    }
  }


  viewProfil() {
    this.router.navigate(['/profil']);
  }


  onLogOut() {
    this.userService.signOut();
  }

  auth() {
    const dialogRef = this._dialog.open(AuthComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
