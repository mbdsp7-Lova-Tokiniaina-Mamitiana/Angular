import {Component, OnInit, ViewChild} from '@angular/core';
import { PariService } from 'src/app/shared/services/pari.service';
import {Pari} from '../../shared/interfaces/pari';
import {DesignService} from '../../shared/services/design.service';
import {ErrorTracker} from '../../shared/models/error-tracker';

@Component({
  selector: 'app-list-pari',
  templateUrl: './list-pari.component.html',
  styleUrls: ['./list-pari.component.css']
})
export class ListPariComponent implements OnInit {

  listPari: Pari[] = [];
  constructor(
    private pariService: PariService,
    private designService: DesignService
  ) { }

  ngOnInit(): void {
    this.getListPari();
  }

  getListPari() {
    this.pariService.getAll().subscribe(
      (dataResult) => {
        this.listPari = dataResult.docs;
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }

  getPariById(idPari: string) {
    return idPari;
  }

}
