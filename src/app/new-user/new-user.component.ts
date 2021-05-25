import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignService } from '../shared/services/design.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  signInForm: FormGroup;
  constructor(
    public designService: DesignService,
    public userService: UserService,
    private router: Router
  ) {
    this.signInForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      role: new FormControl('client')
    })
  }

  ngOnInit(): void {
    
  }

  onSignIn() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);
      let userData = this.userService.register(this.signInForm.value).subscribe(
        (data) => {
          this.designService.openSnackBar("success", "Enregistrement réussi", "OK");
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 2000);
        }
      )
    } else {
      this.designService.openSnackBar("warning", "Veuillez remplir la formulaire", "OK");
    }
  }
}
