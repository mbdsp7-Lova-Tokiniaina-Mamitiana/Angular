import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Match} from '../shared/interfaces/match';
import {MatchService} from '../shared/services/match.service';
import {ErrorTracker} from '../shared/models/error-tracker';
import {DesignService} from '../shared/services/design.service';
import {environment} from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {mapboxConfig} from '../shared/constant';

@Component({
    selector: 'app-detail-match',
    templateUrl: './detail-match.component.html',
    styleUrls: ['./detail-match.component.scss',
        '../../assets/css/template/main.scss',
        '../../assets/css/template/widget.scss',
        '../../assets/css/template/mapbox.scss']
})
export class DetailMatchComponent implements OnInit {

    @ViewChild('mapCard', {static: true, read: ElementRef})
    mapCard: ElementRef;
    photo_url: string = environment.photo_endpoint;
    match?: Match;
    qrCode: any;
    mapboxContent: mapboxgl.Map;
    latitude: number;
    longitude: number;

    constructor(
        private route: ActivatedRoute,
        private matchService: MatchService,
        private designService: DesignService
    ) {
    }

    viewMap(longitude:number, latitude:number) {
        this.mapboxContent = new mapboxgl.Map({
            container: this.mapCard.nativeElement,
            style: mapboxConfig.style,
            zoom: 13,
            center: [longitude, latitude],
            accessToken: mapboxConfig.accessToken
        });
        this.mapboxContent.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(this.mapboxContent);
    }

    getMatchDetail() {
        const idMatch: string = this.route.snapshot.params.idMatch;
        this.matchService.getById(idMatch).subscribe(
            (matchDetail) => {
                this.match = matchDetail;
                this.viewMap(this.match.longitude, this.match.latitude)
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
