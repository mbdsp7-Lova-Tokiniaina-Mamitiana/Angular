import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ErrorTracker} from '../shared/models/error-tracker';
import {DesignService} from '../shared/services/design.service';
import {Match} from '../shared/interfaces/match';
import {MatchService} from '../shared/services/match.service';
import {UserService} from '../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {Pari} from '../shared/interfaces/pari';
import {PariService} from '../shared/services/pari.service';
import {environment} from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';
import {EquipeService} from '../shared/services/equipe.service';
import {Equipe} from '../shared/interfaces/equipe';
import {Pagination} from '../shared/interfaces/pagination';
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
  userCount: number = 0;

  page: number = 1;
  limit:number = 2;

  matchPagination: Pagination = null;
  equipePagination: Pagination = null;
  photo_url: string = environment.photo_endpoint;


  pageSizeOptions: number[] = [5, 10, 25];
  pageEvent: PageEvent;

  matchDate: FormGroup;

  equipe: string = '';
  pari: string = '';


  list_match_params = {
    limit: 10000,
    page: 1,
    pari: "undefined",
    equipe: "undefined",
    etat: "undefined",
    periode: "undefined",
    isToday: "undefined"
  }

  constructor(
    private matchService: MatchService,
    private designService: DesignService,
    private userService: UserService,
    private _dialog: MatDialog,
    private pariService: PariService,
    private equipeService: EquipeService,
    private ngxLoader: NgxUiLoaderService
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

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
    this.getListMatch(this.list_match_params);
    this.getListPari();
    this.getListEquipe();

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
    this.list_match_params.equipe = (this.equipe.length>0)?this.equipe:"undefined";
    this.list_match_params.pari = (this.pari.length>0)?this.pari:"undefined";
    this.getListMatch(this.list_match_params);
  }

}
