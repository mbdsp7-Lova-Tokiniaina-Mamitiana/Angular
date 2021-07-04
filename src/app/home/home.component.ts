import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    loggedUser: any;
    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
      this.loggedUser = this.userService.getCurrentUser();
      console.log(this.loggedUser);
    }


}
