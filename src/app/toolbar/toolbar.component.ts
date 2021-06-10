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
    if (localStorage.getItem('token') != null) {
      this.token = localStorage.getItem('token');
      let tokenData = this.userService.decodeToken(this.token)['user'];
      if (tokenData) {
        this.loggedUser = tokenData;
      }
    }
    //console.log('User token data => ', localStorage.getItem("token"));

    if (this.userService.isLogged.value.email) {
      this.userService.getCurrentUser().subscribe(
        (dataUser) => {
          this.loggedUser = dataUser;
          console.log('User => ', dataUser);
        }
      );
    }
  }

  viewProfil() {
    this.router.navigate(['/profil']);
  }


  onLogOut() {
    this.userService.logOut().subscribe(
      () => {
        localStorage.removeItem('token');
        window.location.reload();
      }
    );
  }
}
