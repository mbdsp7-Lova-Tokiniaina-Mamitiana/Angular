import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddTokenComponent} from './dialog-add-token/dialog-add-token.component';
import {DesignService} from '../shared/services/design.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AppLoader} from '../shared/constant';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {ErrorTracker} from '../shared/models/error-tracker';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss', '../../assets/css/template/main.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProfilComponent implements OnInit {

  user: User;
  //displayedColumns: string[] = ['dateHisto', 'textePari', 'montant', 'nomEquipe1', 'avatarEquipe1', 'nomEquipe1', 'avatarEquipe1', 'cote', 'dateMatch'];
  displayedColumns: string[] = ['dateHisto', 'textePari', 'montant', 'cote', 'dateMatch'];
  //displayedColumns: string[] = ['Date du pari', 'Pari', 'Mise', 'Cote', 'Date du match'];
  histoPersoList: any[] = [];
  dataSource = new MatTableDataSource(this.histoPersoList);
  actualToken: number = 0;
  expandedElement: any | null;

  loaderLogo = AppLoader.loaderLogo;
  loaderColor = AppLoader.loaderColor;
  loaderText = AppLoader.loaderTextMatch;

  constructor(
    private userService: UserService,
    private _dialog: MatDialog,
    private designService: DesignService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.user = new User('','','');
  }

  initializeProfil() {
    this.ngxLoader.startLoader('loader-profil');
    this.userService.profil().subscribe(
      (user) => {
        this.actualToken = user.solde;
        this.ngxLoader.stopLoader('loader-profil');
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }

  personalHistories(max:number, offset:number, statut:number) {
    this.ngxLoader.startLoader('loader-histo-personnel');
    this.userService.personnalHistories(max, offset, statut).subscribe(
      (dataResult) => {
        this.dataSource = dataResult;
        console.log(this.dataSource);
        this.ngxLoader.stopLoader('loader-histo-personnel');
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }

  ngOnInit(): void {
      this.initializeProfil();
      this.user = this.userService.getCurrentUser();
      this.personalHistories(10,0,0);
  }

  addToken() {
    const dialogRef = this._dialog.open(DialogAddTokenComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Result", result);
        this.designService.openSuccessSnackBar("Ajout de jeton avec succès !!!");
        this.initializeProfil();
      }
    });
  }
}
