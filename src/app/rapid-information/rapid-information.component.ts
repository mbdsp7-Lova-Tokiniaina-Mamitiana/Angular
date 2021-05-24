import { Component, OnInit } from '@angular/core';
import { PariService } from '../shared/services/pari.service';

@Component({
  selector: 'app-rapid-information',
  templateUrl: './rapid-information.component.html',
  styleUrls: ['./rapid-information.component.css']
})
export class RapidInformationComponent implements OnInit {

  constructor(
    private pariService: PariService
  ) { }

  ngOnInit(): void {
  }

}
