import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//  i18n - Langue française
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

//  Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//  Routing
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'les-blocs', component: EcranBlocsComponent, data: {pageName: "Les blocs"} },
  { path: 'classements', component: EcranClassementsComponent, data: {pageName: "Classement general"} },
  { path: 'progression', component: EcranProgressionComponent, data: {pageName: "Ma progression"} },
  { path: '', component: EcranBlocsComponent, data: {pageName: "Les blocs"} },
  { path: '*', component: EcranBlocsComponent, data: {pageName: "Les blocs"} },

];
//  App components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EcranProgressionComponent } from './main/ecran-progression/ecran-progression.component';
import { EcranClassementsComponent } from './main/ecran-classements/ecran-classements.component';
import { EcranBlocsComponent } from './main/ecran-blocs/ecran-blocs.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { DialogLoginComponent } from './header-menu/dialog-login/dialog-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    EcranProgressionComponent,
    EcranClassementsComponent,
    EcranBlocsComponent,
    HeaderMenuComponent,
    DialogLoginComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    //  Routing
    RouterModule.forRoot(routes),
    //  HTTP client
    HttpClientModule,
    //  Angular Material Animations
    BrowserAnimationsModule,
    //  Angular Material Components
    MatButtonModule, MatListModule, MatIconModule, MatDialogModule, MatInputModule, MatTabsModule, 
    MatCardModule, MatExpansionModule, MatSelectModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatSnackBarModule
  ],
  exports: [RouterModule],
  providers: [
    {provide: LOCALE_ID, useValue: "fr-CA" }  /** dates en francais */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
