import {Component, OnInit} from '@angular/core';
import {ErrorTracker} from '../shared/models/error-tracker';
import {DesignService} from '../shared/services/design.service';
import {Match} from '../shared/interfaces/match';
import {MatchService} from '../shared/services/match.service';
import {UserService} from '../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.scss', '../../assets/css/template/main.scss']
})
export class ListMatchComponent implements OnInit  {
  listMatch: Match[] = [];
  filterValue: string = "";
  constructor(
    private matchService: MatchService,
    private designService: DesignService,
    private userService: UserService,
    private _dialog: MatDialog
  ) {
  }

  getListMatch() {
    this.matchService.getAll().subscribe(
      (dataResult) => {
        this.listMatch = dataResult.docs;
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }
  ngOnInit(): void {
    this.getListMatch();
  }

  parier() {
    if (this.userService.isLoggedIn()) {
      console.log("Peux parier");
    } else {
      this.designService.openInfoSnackBar("Vous devez vous connecter avant de parier sur un match !");
    }
  }
}
