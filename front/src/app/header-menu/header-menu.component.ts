import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  pageName: string;

  constructor(private router: Router, public dialog: MatDialog) {
    router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        let data = event.state.root.firstChild.data;
        this.pageName = data.pageName;
      }
    });
  }

  ngOnInit(): void {
  }


  openLoginDialog() {
    this.dialog.open(DialogLoginComponent); //, { height: '50vh', width: '60%', }
  }
}
