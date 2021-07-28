import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import {MatchService} from '../../shared/services/match.service';

@Component({
  selector: 'app-dialog-info-pari',
  templateUrl: './dialog-info-pari.component.html',
  styleUrls: ['./dialog-info-pari.component.scss', '../../../assets/css/template/mapbox.scss']
})
export class DialogInfoPariComponent implements OnInit {

  match: any;

  // Localisaiton
  @ViewChild('map', {static: true, read: ElementRef})
  map: ElementRef;
  mapboxContent: mapboxgl.Map;

  constructor(
    public dialogRef: MatDialogRef<DialogInfoPariComponent>,
    private matchService: MatchService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.match = this.data;
    this.matchService.viewMap(this.mapboxContent, this.match.localisationy, this.match.localisationx, this.map);
  }

}
