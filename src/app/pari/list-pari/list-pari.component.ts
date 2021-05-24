import { Component, OnInit } from '@angular/core';
import { PariService } from 'src/app/shared/services/pari.service';

@Component({
  selector: 'app-list-pari',
  templateUrl: './list-pari.component.html',
  styleUrls: ['./list-pari.component.css']
})
export class ListPariComponent implements OnInit {

  constructor(
    private pariService: PariService
  ) { }

  ngOnInit(): void {
  }

}
