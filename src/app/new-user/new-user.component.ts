import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignService } from '../shared/services/design.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  signInForm: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    public designService: DesignService,
    private router: Router
  ) {
    this.signInForm = new FormGroup({
      pseudonyme: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      solde: new FormControl('')
    })
  }

  ngOnInit(): void {
    
  }

  onSignIn() {

  }
}
