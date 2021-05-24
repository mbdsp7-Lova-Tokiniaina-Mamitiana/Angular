import { Component, OnInit } from '@angular/core';
import { PariService } from 'src/app/shared/services/pari.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private pariService: PariService
  ) { }

  ngOnInit(): void {
  }

}
