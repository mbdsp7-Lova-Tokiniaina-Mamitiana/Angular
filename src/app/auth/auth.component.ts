import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignService } from '../shared/services/design.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    public designService: DesignService,
    private router: Router
  ) {
    this.authForm = new FormGroup({
      pseudonyme: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.authForm.valid) {
      this.router.navigate(['/home']);
    } else {
      this.designService.openSnackBar('warning', 'Veuillez bien renseigner les informations nécessaires', 'OK');
    }
  }

  onSignUp() {
    console.log("Sign UP");
  }
}
