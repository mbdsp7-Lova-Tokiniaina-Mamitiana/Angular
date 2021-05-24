import { Component, OnInit } from '@angular/core';
import { PariService } from 'src/app/shared/services/pari.service';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.css']
})
export class ListMatchComponent implements OnInit {

  constructor(
    private pariService: PariService
  ) { }

  ngOnInit(): void {
  }

}
