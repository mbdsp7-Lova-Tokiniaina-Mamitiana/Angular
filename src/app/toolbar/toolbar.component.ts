import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  loggedUser: User = new User('', '', '');

  token: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    // TOKEN , GET CURRENT USER
    if (this.userService.isLoggedIn()) {
      this.loggedUser = this.userService.getCurrentUser();
    }
  }


  viewProfil() {
    this.router.navigate(['/profil']);
  }


  onLogOut() {
    this.userService.signOut();
  }
}
