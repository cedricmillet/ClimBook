import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//  Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
//  Routing
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'les-blocs', component: EcranBlocsComponent },
  { path: 'classements', component: EcranClassementsComponent },
  { path: 'progression', component: EcranProgressionComponent },
  { path: '', component: EcranBlocsComponent },
  { path: '*', component: MainComponent },

];
//  App components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EcranProgressionComponent } from './main/ecran-progression/ecran-progression.component';
import { EcranClassementsComponent } from './main/ecran-classements/ecran-classements.component';
import { EcranBlocsComponent } from './main/ecran-blocs/ecran-blocs.component';
import { PlanSalleComponent } from './main/ecran-blocs/plan-salle/plan-salle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    EcranProgressionComponent,
    EcranClassementsComponent,
    EcranBlocsComponent,
    PlanSalleComponent
  ],
  imports: [
    BrowserModule,
    //  Routing
    RouterModule.forRoot(routes),
    //  Angular Material Animations
    BrowserAnimationsModule,
    //  Angular Material Components
    MatButtonModule, MatListModule, MatIconModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
