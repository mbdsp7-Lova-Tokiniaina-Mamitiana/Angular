import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

/** Import des modules angular */
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


/** Interceptor */
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from './shared/interceptor/header.interceptor';

/** Import des components */
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {ProfilComponent} from './profil/profil.component';
import {NewUserComponent} from './new-user/new-user.component';
import {ListMatchComponent} from './pari/list-match/list-match.component';
import {ListPariComponent} from './pari/list-pari/list-pari.component';
import {HistoryComponent} from './pari/history/history.component';
import {RapidInformationComponent} from './rapid-information/rapid-information.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ErrorService} from './shared/services/error.service';
import {ConvertmonthDatePipe} from './shared/pipes/convertmonth-date.pipe';
import {ParierMatchComponent} from './shared/modal/parier-match/parier-match.component';
import {DetailMatchComponent} from './detail-match/detail-match.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'nouvel-utilisateur',
    component: NewUserComponent
  },
  {
    path: 'detail-match/:idMatch',
    component: DetailMatchComponent
  }

];

const materialModule = [
  ReactiveFormsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSelectModule,
  MatDividerModule,
  MatListModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDialogModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatStepperModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatSlideToggleModule,
  HttpClientModule
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    ProfilComponent,
    ToolbarComponent,
    NewUserComponent,
    ListMatchComponent,
    ListPariComponent,
    HistoryComponent,
    RapidInformationComponent,
    ConvertmonthDatePipe,
    ParierMatchComponent,
    DetailMatchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    [...materialModule],
    RouterModule.forRoot(routes)

  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorService},
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
