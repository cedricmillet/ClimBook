import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//  Routing
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: '*', component: MainComponent },

];

//  App components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
