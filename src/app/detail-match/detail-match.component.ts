import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../shared/interfaces/match';
import {MatchService} from '../shared/services/match.service';
import {ErrorTracker} from '../shared/models/error-tracker';
import {DesignService} from '../shared/services/design.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-detail-match',
    templateUrl: './detail-match.component.html',
    styleUrls: ['./detail-match.component.scss', '../../assets/css/template/main.scss', '../../assets/css/template/widget.scss']
})
export class DetailMatchComponent implements OnInit {

    photo_url: string = environment.photo_endpoint;
    match?: Match;
    qrCode: any;

    constructor(
        private route: ActivatedRoute,
        private matchService: MatchService,
        private designService: DesignService
    ) {
    }

    getMatchDetail() {
        const idMatch: string = this.route.snapshot.params.idMatch;
        this.matchService.getById(idMatch).subscribe(
            (matchDetail) => {
                this.match = matchDetail;
            }, (error: ErrorTracker) => {
                const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
                this.designService.openErrorSnackBar(errors);
            }
        );
    }

    ngOnInit(): void {
        this.getMatchDetail();
        this.qrCode = this.route.snapshot.params.idMatch;
    }
}
