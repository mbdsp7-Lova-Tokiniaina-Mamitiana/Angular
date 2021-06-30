import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user';

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
        this.userService.getCurrentUser().subscribe(
            (currentUser) => {
                this.loggedUser = currentUser
            }
        )
    }

    ngOnInit(): void {
    }


}
