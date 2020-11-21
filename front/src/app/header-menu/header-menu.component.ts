import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  
  pageName: string;
  @ViewChild(DialogLoginComponent) dialogComponent;

  constructor(public authService : AuthService, private router:Router, public dialog: MatDialog) {
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
    const dialogRef = this.dialog.open(DialogLoginComponent); //, { height: '50vh', width: '60%', }
    dialogRef.componentInstance.onClose.subscribe(d => {
      this.closeLoginDialog()
    })
  }

  closeLoginDialog() {
    this.dialog.closeAll();
  }
}
