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
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {Pagination} from '../shared/interfaces/pagination';

@Component({
    selector: 'app-list-match',
    templateUrl: './list-match.component.html',
    styleUrls: ['./list-match.component.scss', '../../assets/css/template/main.scss','../../assets/css/template/slick-scrolling.scss']
})
export class ListMatchComponent implements OnInit {
    listMatch: Match[] = [];
    listPari: Pari[] = [];
    listEquipe: Equipe[] = [];

    page: number = 1;
    limit:number = 2;

    matchPagination: Pagination = null;
    equipePagination: Pagination = null;
    photo_url: string = environment.photo_endpoint;


    pageSizeOptions: number[] = [5, 10, 25];
    pageEvent: PageEvent;

    @ViewChild("scroller")
    scroller!: CdkVirtualScrollViewport;

    constructor(
        private matchService: MatchService,
        private designService: DesignService,
        private userService: UserService,
        private _dialog: MatDialog,
        private pariService: PariService,
        private equipeService: EquipeService,
        private ngZone: NgZone,
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
        );
    }


    getListEquipe() {
        this.equipeService.getAll(1,1000).subscribe(
            (dataResult) => {
                this.listEquipe = dataResult.docs;
            }, (error: ErrorTracker) => {
                const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
                this.designService.openErrorSnackBar(errors);
            }
        );
    }

    getListPari() {
        this.pariService.getAll().subscribe(
            (dataResult) => {
                this.listPari = dataResult;
            }, (error: ErrorTracker) => {
                const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
                this.designService.openErrorSnackBar(errors);
            }
        );
    }

    ngOnInit(): void {
        this.getListMatch();
        this.getListPari();
        this.getListEquipe();
    }

    parier() {
        if (this.userService.isLoggedIn()) {
            console.log('Peux parier');
        } else {
            this.designService.openInfoSnackBar('Vous devez vous connecter avant de parier sur un match !');
        }
    }


    slideConfig = {"slidesToShow": 10, "slidesToScroll": 1};


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
}
