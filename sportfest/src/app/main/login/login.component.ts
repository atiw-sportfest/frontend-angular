import { Md5 } from 'ts-md5/dist/md5';
import { SportfestService } from '../../sportfest.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loginClose: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginSubmit: EventEmitter<any> = new EventEmitter<any>();

  username: string;
  password: string;

  errorMsg: string;

  constructor(private sfService: SportfestService) { }

  ngOnInit() {
  }

  public submit() { //Drücken des Login-Buttons
    if (this.username !== "" && this.password !== "" && this.username && this.password) {
      // Logindaten verschlüsseln
      let encryptpwd = Md5.hashStr(this.password); // TODO: wenn mehr Zeit -> Umstellung auf sichere Hash-Funktion

      // Logindaten übermitteln
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
            this.loginSubmit.emit(); //Overlay schließen wenn alle Request fertig sind
          },
            (err) => {
              console.error('GET-Service "userPrivileges()" not reachable.');
            });
        },
        err => {
          console.error(err);
          this.error();
        }
      );
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
      this.loginClose.emit();
    }
  }
}
