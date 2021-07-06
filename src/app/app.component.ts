import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pari-angular';

  constructor(private matIconRegistry: MatIconRegistry, private domSatinizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
          'clock',
          this.domSatinizer.bypassSecurityTrustResourceUrl("../assets/icons/clock.svg")
      );

  }
}
