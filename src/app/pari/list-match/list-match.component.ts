import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ErrorTracker} from '../../shared/models/error-tracker';
import {DesignService} from '../../shared/services/design.service';
import {Match} from '../../shared/interfaces/match';
import {MatchService} from '../../shared/services/match.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from '../../shared/services/user.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-match',
  templateUrl: './list-match.component.html',
  styleUrls: ['./list-match.component.css']
})
export class ListMatchComponent implements OnInit, AfterViewInit  {
  listMatch: Match[] = [];
  // Mat Table
  displayedColumns: string[] = ['date_match', 'localisation', 'equipe', 'etat', 'pari'];
  dataSource = new MatTableDataSource(this.listMatch);
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  filterValue: string = "";
  constructor(
    private matchService: MatchService,
    private designService: DesignService,
    private userService: UserService,
    private _dialog: MatDialog
  ) {
  }

  getListMatch() {
    this.matchService.getAll().subscribe(
      (dataResult) => {
        this.listMatch = dataResult;
        this.dataSource = new MatTableDataSource(this.listMatch);
      }, (error: ErrorTracker) => {
        const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
        this.designService.openErrorSnackBar(errors);
      }
    )
  }
  ngOnInit(): void {
    this.getListMatch();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  parier() {
    if (this.userService.isLoggedIn()) {
      console.log("Peux parier");
    } else {
      this.designService.openInfoSnackBar("Vous devez vous connecter avant de parier sur un match !");
    }
  }
}
