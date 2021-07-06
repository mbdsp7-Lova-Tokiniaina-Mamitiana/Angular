import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';


const ELEMENT_DATA: any[] = [
  {number: 1, date: '2021-12-01', mouvement: 'Entrée', jeton: 200},
  {number: 2, date: '2021-11-25', mouvement: 'Sorti', jeton: 20},
  {number: 3, date: '2021-11-20', mouvement: 'Sorti', jeton: 100},
  {number: 4, date: '2021-10-01', mouvement: 'Entrée', jeton: 1500},
  {number: 5, date: '2021-04-11', mouvement: 'Sorti', jeton: 20},
  {number: 6, date: '2021-04-10', mouvement: 'Entrée', jeton: 200},
  {number: 7, date: '2021-03-03', mouvement: 'Sorti', jeton: 11},
  {number: 8, date: '2021-03-01', mouvement: 'Entrée', jeton: 350},
  {number: 9, date: '2021-02-28', mouvement: 'Sorti', jeton: 15},
  {number: 10, date: '2021-01-15', mouvement: 'Entrée', jeton: 100},
];

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss', '../../assets/css/template/main.scss']
})

export class ProfilComponent implements OnInit {

  user: User;
  displayedColumns: string[] = ['number', 'date', 'mouvement', 'jeton'];
  dataSource = ELEMENT_DATA;




  constructor(
    private userService: UserService
  ) {
    this.user = new User('','','');
  }

  ngOnInit(): void {
      this.userService.profil().subscribe(
          (user) => {
              console.log(user);
          }
      )
    this.user = this.userService.getCurrentUser();
  }

}
