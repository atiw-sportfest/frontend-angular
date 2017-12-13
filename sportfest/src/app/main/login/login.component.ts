import { Md5 } from 'ts-md5/dist/md5';
import { SportfestService } from '../../sportfest.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { AnmeldungApi, MetaApi } from "../../api/api";
import { User } from "../../model/models";
import { JwtHelper } from "angular2-jwt/angular2-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  jwtHelper: JwtHelper = new JwtHelper();
  errorMsg: string;

  constructor(public thisDialogRef: MatDialogRef<LoginComponent>, private sfService: SportfestService, private metaApi: MetaApi) { }

  ngOnInit() {
  }

  public submit() { //Drücken des Login-Buttons
    if (this.username !== "" && this.password !== "" && this.username && this.password) {
      // Logindaten verschlüsseln
      let encryptpwd = Md5.hashStr(this.password); // TODO: wenn mehr Zeit -> Umstellung auf sichere Hash-Funktion

      // Logindaten übermitteln
      let user: User = {
        username: this.username,
        password: encryptpwd.toString()
      }
      this.metaApi.authenticatePost(user).subscribe(success => {
        sessionStorage.setItem('init', '' + success.intial);
        sessionStorage.setItem('token', success.token);
        sessionStorage.setItem('role', this.jwtHelper.decodeToken(success.token).role);
        sessionStorage.setItem('username', this.jwtHelper.decodeToken(success.token).username);
        this.thisDialogRef.close("Login");
      }, data => {
        this.error();
      })/*
      this.sfService.userLogin(this.username, encryptpwd.toString()).subscribe(
        data => {
          let token = data.text(); //token = bearer-Token in der Antwort des Servers

          // Token in localStorage packen
          sessionStorage.setItem('token', token);
          this.sfService.userPrivileges().subscribe(data => { //Fragt Benutzernamen und Rolle des Benutzers ab
            if (data.role != 'gast') {
              sessionStorage.setItem('role', data.role); //Setzt Rolle des Benutzers
              sessionStorage.setItem('username', data.username);
            } else {
              sessionStorage.setItem('role', 'gast');
              sessionStorage.setItem('username', null);
            }
            if(encryptpwd == Md5.hashStr('Atiw2017')){
              sessionStorage.setItem('init','true');
            }
            this.thisDialogRef.close("Login"); //Overlay schließen wenn alle Request fertig sind
          },
            (err) => {
              console.error('GET-Service "userPrivileges()" not reachable.');
            });
        },
        err => {
          console.error(err);
          this.error();
        }
      );*/
    } else {
      this.error();
    }
  }

  public error() {
    this.errorMsg = "Fehlgeschlagen."
  }

  public keypress(event: any) {
    if (event.keyCode == 13) { // Enter gedrückt
      this.submit();
    }
  }

  public close(event: any) {
    if (event.clientX !== 0 || event.clientY !== 0) {
      this.thisDialogRef.close("Cancel");
    }
  }
}
