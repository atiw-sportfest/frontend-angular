import { PasswordChangeComponent } from '../../password-change/password-change.component';
import { LoginComponent } from '../../login/login.component';
import { SportfestService } from '../../../sportfest.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from "@angular/material";
import { Md5 } from 'ts-md5/dist/md5';
import { DisziplinNEU } from '../../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerImage = '/assets/images/tribune2.png';
  atiwImage = '/assets/images/atiwlogo.png';
  title = 'Sportfest';
  year = new Date().getFullYear();
  username: string;
  role: string;
  disziplinenTeam: Array<any> = [];
  disziplinenEinzel: Array<any> = [];
  disziplinen: Array<DisziplinNEU> = [];

  constructor(private router: Router,
    private dialog: MdDialog,
    private sfService: SportfestService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role'); // Rolle aus dem Speicher laden (wichtig beim neuladen der Seite)
    this.username = localStorage.getItem('username'); // Benutzernamen aus dem speicher laden (wichtig beim neuladen der Seite)
    if (localStorage.getItem('init') == 'true') {
      let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true });
      dlg.componentInstance.setInitPw(true);
      dlg.componentInstance.pwSave.subscribe(data => dlg.close());
    }
  }

  public loadDD() { //Lädt Disziplinen bei Klick auf Sportarten
    this.disziplinenEinzel = [];
    this.disziplinenTeam = [];
    this.sfService.disziplinen().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].teamleistung == false || data[i].did == 3) {
          this.disziplinenEinzel.push(data[i]);
        } else {
          this.disziplinenTeam.push(data[i]);
        }
      }
    },
      (err) => {
        console.error('GET-Service "disziplinen()" not reachable.');
      });
  }

  public loadDDNEU() { //Lädt Disziplinen bei Klick auf Sportarten
    this.disziplinen = [];
    this.sfService.disziplinenNEU().subscribe(data => {
      this.disziplinen = data;
    },
      (err) => {
        console.error('GET-Service "disziplinen()" not reachable.');
      });
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.username = null;
    this.navigateToDashboard();
  }
  public login() {
    let dlg = this.dialog.open(LoginComponent); //Login-Overlay öffnen
    dlg.componentInstance.loginClose.subscribe(data => dlg.close());
    dlg.componentInstance.loginSubmit.subscribe(data => {
      if (localStorage.getItem('init') == 'true') {
        let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true });
        dlg.componentInstance.setInitPw(true);
        dlg.componentInstance.pwSave.subscribe(data => dlg.close());
      }
      dlg.close();
      console.log('Login: ' + data);
      this.username = localStorage.getItem('username'); //Benutzernamen aus dem Local Storage auslesen
      this.role = localStorage.getItem('role'); //Rolle aus dem Local Storage auslesen
    });
  }
  //Routing bei Klick auf Button im Menü
  public navigateToEinzel(did: number, name: string) {
    this.router.navigate(['/einzel/' + did + '/' + name]);
  }
  public navigateToTeam(did: number, name: string) {
    this.router.navigate(['/team/' + did + '/' + name]);
  }
  public navigateToDashboard() {
    this.router.navigate(['/home']);
  }
  public navigateToCreateDiscipline() {
    this.router.navigate(['/createDiscipline']);
  }
  public navigateToImportKlasse() {
    this.router.navigate(['/import']);
  }
  public navigateToActivateDiscipline() {
    this.router.navigate(['/activateDiscipline']);
  }
  public navigateToUAC() {
    this.router.navigate(['/uac']);
  }
  public navigateToDisziplin(id: number){
    this.router.navigate(['/disziplin/'+ id]);
  }
  public navigateToCreateDisciplineNew(){
    this.router.navigate(['/createDisciplineNew/']);
  }

  public openChangePassword() {
    let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true });
    dlg.componentInstance.pwCancel.subscribe(data => dlg.close());
    dlg.componentInstance.pwSave.subscribe(data => dlg.close());
  }

  public navigateToCreateSportfest() {
    this.router.navigate(['/createSportfest']);
  }
}
