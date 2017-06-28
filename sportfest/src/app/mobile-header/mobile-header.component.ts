import { PasswordChangeComponent } from './../password-change/password-change.component';
import { MdDialog } from '@angular/material';
import { SportfestService } from 'app/sportfest.service';
import { LoginComponent } from '../login/login.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css']
})
export class MobileHeaderComponent implements OnInit {
  
  username: string;

  @Output() sidenavChange = new EventEmitter<any>();
  
  constructor(private router: Router,
              public dialog: MdDialog,
              private sfService: SportfestService) { }

  ngOnInit() {
  }
  
  public changeSidenav() {
    this.sidenavChange.emit();
  }
  public navigateToDashboard() {
    this.router.navigate(['/home']);
  }
  public openChangePassword() {
    let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true });
    dlg.componentInstance.pwCancel.subscribe(data => dlg.close());
    dlg.componentInstance.pwSave.subscribe(data => dlg.close());
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.username=null;
    this.router.navigate(['/home']); 
  }
  
  public login() {
    let dlg = this.dialog.open(LoginComponent);
    dlg.componentInstance.loginClose.subscribe(data => dlg.close());
    dlg.componentInstance.loginSubmit.subscribe(data => {
      dlg.close();
      this.sfService.userPrivileges().subscribe(
        (data) => {
          console.log(data);
          this.username = data.aud;
        },
        (err) => {
          console.error('GET-Service "userPrivileges()" not reachable.');
      });
    });
  }
}
