import { Component, OnInit } from '@angular/core';
import {ErrorTracker} from '../../shared/models/error-tracker';
import {DesignService} from '../../shared/services/design.service';
import {Match} from '../../shared/interfaces/match';
import {MatchService} from '../../shared/services/match.service';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.css']
})
export class ListMatchComponent implements OnInit {
  listMatch: Match[] = [];
  constructor(
    private matchService: MatchService,
    private designService: DesignService
  ) { }

  getListMatch() {
    this.matchService.getAll({etat: false}).subscribe(
      (dataResult) => {
        console.log("Liste des match => " + dataResult);
        this.listMatch = dataResult;
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }
  ngOnInit(): void {
    this.getListMatch();
  }
}
