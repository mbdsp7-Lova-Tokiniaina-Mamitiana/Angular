import {Component, OnInit} from '@angular/core';
import {ErrorTracker} from '../shared/models/error-tracker';
import {DesignService} from '../shared/services/design.service';
import {Match} from '../shared/interfaces/match';
import {MatchService} from '../shared/services/match.service';
import {UserService} from '../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {Pari} from '../shared/interfaces/pari';
import {PariService} from '../shared/services/pari.service';
import {environment} from 'src/environments/environment';
import {EquipeService} from '../shared/services/equipe.service';
import {Equipe} from '../shared/interfaces/equipe';
import {FormControl, FormGroup} from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {AppLoader} from '../shared/constant';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.scss',
    '../../assets/css/template/main.scss',
    '../../assets/css/template/slick-scrolling.scss',
    '../../assets/css/template/widget.scss']
})
export class ListMatchComponent implements OnInit {
  // loader
  loaderLogo = AppLoader.loaderLogo;
  loaderColor = AppLoader.loaderColor;
  loaderText = AppLoader.loaderTextMatch;

  listMatch: Match[] = [];
  listPari: Pari[] = [];
  listEquipe: Equipe[] = [];
  listMatchToday: Match[] = [];
  userCount: number = 0;

  matchCount: number = 0;

  page: number = 1;
  limit:number = 2;

  photo_url: string = environment.photo_endpoint;


  matchDate: FormGroup;

  equipe: string = '';
  pari: string = '';


  list_match_pagination = {
    limit: 10000,
    page: 1
  }

   options = {
    startVal: 0,
    duration: 5,
    separator: " "
  };
  constructor(
    private matchService: MatchService,
    private designService: DesignService,
    private userService: UserService,
    private _dialog: MatDialog,
    private pariService: PariService,
    private equipeService: EquipeService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.matchDate = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  getListMatch(params) {
    this.ngxLoader.startLoader('loader-liste-match');
    this.matchService.getAll(params).subscribe(
      (dataResult) => {
        this.listMatch = dataResult.docs;
        this.ngxLoader.stopLoader('loader-liste-match');
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    );
  }

  getMatchCount(params) {
    this.matchService.getAll(params).subscribe(
      (dataResult) => {
        this.matchCount = dataResult.docs.length;
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    );
  }

  getListMatchToday() {
    let paramsListMatchToday = {
      ...this.list_match_pagination,
      isToday: true
    }
    this.matchService.getAll(paramsListMatchToday).subscribe(
      (dataResult) => {
        this.listMatchToday = dataResult.docs;
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }

  getListEquipe() {
    this.ngxLoader.startLoader('loader-liste-equipe');
    this.equipeService.getAll(1,10000).subscribe(
      (dataResult) => {
        this.listEquipe = dataResult.docs;
        this.ngxLoader.stopLoader('loader-liste-equipe');
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    );
  }

  getListPari() {
    //this.ngxLoader.startLoader('loader-liste-pari');
    this.pariService.getAll().subscribe(
      (dataResult) => {
        this.listPari = dataResult;
        //this.ngxLoader.stopLoader('loader-liste-pari');
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    );
  }

  ngOnInit(): void {
    this.getListMatch(this.list_match_pagination);
    this.getMatchCount(this.list_match_pagination);
    this.getListPari();
    this.getListEquipe();
    this.getListMatchToday();

    this.userService.userCount().subscribe(
      (data) => {
        this.userCount = data;
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }

  parier() {
    if (this.userService.isLoggedIn()) {
      console.log('Peux parier');
    } else {
      this.designService.openInfoSnackBar('Vous devez vous connecter avant de parier sur un match !');
    }
  }


  slideConfig = {"slidesToShow": 10, "slidesToScroll": 4};


  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  search() {
    let match_params: any;
    const date_debut = this.matchDate.controls.start.value;
    const date_fin = this.matchDate.controls.end.value;
    const equipe = this.equipe;
    const pari = this.pari;

    match_params = {
      ...this.list_match_pagination
    }
    if (equipe.length > 0 ) {
      match_params = {
        ...match_params,
        equipe: equipe
      }
    } if (pari.length > 0) {
      match_params = {
        ...match_params,
        pari: pari
      }
    } if (date_debut) {
      match_params = {
        ...match_params,
        date_debut: new Date(date_debut).toLocaleDateString('fr-CA')
      }
    } if (date_fin) {
      match_params = {
        ...match_params,
        date_fin: new Date(date_fin).toLocaleDateString('fr-CA')
      }
    }

    console.log(match_params);
    this.getListMatch(match_params);
  }

  finish() {
    console.log("Finish");
  }

}
