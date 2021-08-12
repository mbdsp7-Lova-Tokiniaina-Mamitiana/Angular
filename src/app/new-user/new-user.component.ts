import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {DesignService} from '../shared/services/design.service';
import {UserService} from '../shared/services/user.service';
import {ErrorTracker} from '../shared/models/error-tracker';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {AppLoader} from '../shared/constant';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  signUpForm: FormGroup;

  // loader
  loaderLogo = AppLoader.loaderLogo;
  loaderColor = AppLoader.loaderColor;
  loaderText = "Insertion d'un nouveau utilisation en cours ...";

  constructor(
    public designService: DesignService,
    public userService: UserService,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.signUpForm = new FormGroup({
      login: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

  }

  completeUserInfo(idUser: any) {
    const userInfo = {
      id: idUser,
      nom: this.signUpForm.controls.nom.value,
      prenom: this.signUpForm.controls.prenom.value
    };
    this.userService.registerUserInfo(userInfo).subscribe(
      (data) => {
        this.designService.openSuccessSnackBar('Enregistrement avec succès, veuillez vous reconnecter !');
        this.ngxLoader.stop()
      }, (error: ErrorTracker) => {
        this.ngxLoader.stop()
        setTimeout(() => {
          const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
          this.designService.openErrorSnackBar(errors);
        },1000)
      }
    );
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.ngxLoader.start()
      this.designService.openSuccessSnackBar("Création d'un nouveau compte utilisateur en cours, veuillez patienter ...");
      console.log(this.signUpForm.value);
      const userParams = {
        login: this.signUpForm.controls.login.value,
        email: this.signUpForm.controls.email.value,
        password: this.signUpForm.controls.password.value,
        role: 'client'
      };

      this.userService.register(userParams).subscribe(
        (data) => {
          console.log("Insert User Node");
          console.log(data);
          const idUser = data.id;
          this.completeUserInfo(idUser);
        }, (error: ErrorTracker) => {
          this.ngxLoader.stop()
          setTimeout(() => {
            const errors = (error.userMessage != undefined) ? error.userMessage : 'Une erreur s\'est produite, recommencer l\'opération';
            this.designService.openErrorSnackBar(errors);
          },1000)
        }
      );
    } else {
      this.designService.openSnackBar('warning', 'Veuillez remplir la formulaire', 'OK');
    }
  }
}
