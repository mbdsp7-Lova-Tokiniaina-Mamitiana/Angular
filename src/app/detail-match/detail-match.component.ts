import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../shared/interfaces/match';
import {MatchService} from '../shared/services/match.service';
import {ErrorTracker} from '../shared/models/error-tracker';
import {DesignService} from '../shared/services/design.service';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {AppLoader} from '../shared/constant';
import {UserService} from '../shared/services/user.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatDialog} from '@angular/material/dialog';
import {AuthComponent} from '../auth/auth.component';

@Component({
  selector: 'app-detail-match',
  templateUrl: './detail-match.component.html',
  styleUrls: ['./detail-match.component.scss',
    '../../assets/css/template/main.scss',
    '../../assets/css/template/widget.scss',
    '../../assets/css/template/mapbox.scss']
})
export class DetailMatchComponent implements OnInit {

  // loader
  loaderLogo = AppLoader.loaderLogo;
  loaderColor = AppLoader.loaderColor;
  loaderText = AppLoader.loaderTextDetailMatch;
  loaderTextParier = AppLoader.loaderTextParier;

  // Localisaiton
  @ViewChild('mapCard', {static: true, read: ElementRef})
  mapCard: ElementRef;
  mapboxContent: mapboxgl.Map;

  photo_url: string = environment.photo_endpoint;
  match?: Match;
  qrCode: any;
  latitude: number;
  longitude: number;
  logo = 'assets/logo/logo_transparent.png';

  mise: number = 1;
  userInfo: any;

  randomMatch: Match[] = [];
  idMatch?: string;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private designService: DesignService,
    private userService: UserService,
    private ngxLoader: NgxUiLoaderService,
    private _dialog: MatDialog
  ) {
  }



  getMatchDetail(idMatch) {
    this.matchService.getById(idMatch).subscribe(
      (matchDetail) => {
        this.match = matchDetail;
        this.ngxLoader.stopLoader('loader-info');
        this.matchService.viewMap(this.mapboxContent, this.match.longitude, this.match.latitude, this.mapCard);
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    );
  }

  ngOnInit(): void {
    this.ngxLoader.startLoader('loader-info');
    this.idMatch = this.route.snapshot.params.idMatch;
    this.getMatchDetail(this.idMatch);
    this.qrCode = this.route.snapshot.params.idMatch;
    this.userInfo = JSON.parse(localStorage.getItem('_userInfo_')!);
    this.randomFuturMatch();
  }

  onBetting(id_pari: any, cote: number, description: string) {
    this.ngxLoader.startLoader('loader-bet');

    if (!this.userInfo) {
      this.ngxLoader.stopLoader('loader-bet');
      setTimeout(() => {
        this.designService.openErrorSnackBar('Veuillez vous connectez avant de parier !');
        const dialogRef = this._dialog.open(AuthComponent);
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }, 1000);
    } else {
      if (+this.mise <= 0) {
        this.ngxLoader.stopLoader('loader-bet');
        setTimeout(() => {
          this.designService.openErrorSnackBar('Montant de la mise ne peut pas être 0');
        }, 1000);
      } else {
        const dateMatchDetail = new Date(this.match.date_match);
        const dateMatch = `${+dateMatchDetail.getFullYear()}-${+dateMatchDetail.getMonth() + 1}-${+dateMatchDetail.getDay()} ${+dateMatchDetail.getHours()}:${+dateMatchDetail.getMinutes()}`;
        const dateNow = `${+new Date().getFullYear()}-${+new Date().getMonth() + 1}-${+new Date().getDay()} ${+new Date().getHours()}:${+new Date().getMinutes()}`;

        const formData = new FormData();
        formData.append('idmatch', this.match._id);
        formData.append('idpari', id_pari);
        formData.append('iduser', this.userInfo._id);
        formData.append('cote', cote.toString());
        formData.append('equipe1', this.match.equipe1.nom);
        formData.append('equipe2', this.match.equipe2.nom);
        formData.append('textpari', description);
        formData.append('montant', this.mise.toString());
        formData.append('localisationx', this.match.longitude.toString());
        formData.append('localisationy', this.match.latitude.toString());
        formData.append('date', dateMatch);
        formData.append('avatar1', `${this.photo_url}${this.match.equipe1.avatar}`);
        formData.append('avatar2', `${this.photo_url}${this.match.equipe2.avatar}`);
        formData.append('dateHisto', dateNow);

        /*console.log(`idmatch`, matchDetail._id);
        console.log(`idpari`, id_pari);
        console.log(`iduser`, this.userInfo._id);
        console.log('cote', cote.toString());
        console.log(`equipe1`, matchDetail.equipe1.nom);
        console.log(`equipe2`, matchDetail.equipe2.nom);
        console.log(`textpari`, description);
        console.log(`montant`, '');
        console.log(`localisationx`, matchDetail.longitude.toString());
        console.log(`localisationy`, matchDetail.latitude.toString());

        console.log(`date`, dateMatch);
        console.log(`avatar1`, `${this.photo_url}${this.match.equipe1.avatar}`);
        console.log(`avatar2`, `${this.photo_url}${this.match.equipe2.avatar}`);
        console.log(`dateHisto`, dateNow);*/

        this.userService.addPersonnalHistory(formData).subscribe(
          (dataResult) => {
            console.log(dataResult);
            this.ngxLoader.stopLoader('loader-bet');
            setTimeout(() => {
              this.designService.openSuccessSnackBar('Votre pari a été prise en charge ...');
            }, 1000);
          }
        );
      }
    }
  }


  randomFuturMatch() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);

    let params = {
      limit: 3,
      page: 1,
      date_debut: tomorrow.toLocaleDateString('fr-CA')
    };
    //this.ngxLoader.startLoader('loader-random-test');
    this.matchService.getAll(params).subscribe(
      (dataResult) => {
        this.randomMatch = dataResult.docs;
        console.log(this.randomMatch);
        //this.ngxLoader.stopLoader('loader-random-test');
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    );
  }

  getMatchDetailRandom(id) {
    this.idMatch = id;
  }
}
