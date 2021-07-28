import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pari-angular';

  constructor(private matIconRegistry: MatIconRegistry, private domSatinizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'token',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/token.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'clock',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/clock.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/search.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'piggy-bank',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/piggy-bank.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'back',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/back.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'flag',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/flag.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'loss',
      this.domSatinizer.bypassSecurityTrustResourceUrl('../assets/icons/loss.svg')
    );

  }
}
