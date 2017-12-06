import { PasswordChangeComponent } from '../../password-change/password-change.component';
import { LoginComponent } from '../../login/login.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { Md5 } from 'ts-md5/dist/md5';
import { DisziplinApi } from "../../../api/api";
import { Disziplin } from "../../../model/models";

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
  disziplinenTeam: Array<Disziplin> = [];
  disziplinenEinzel: Array<Disziplin> = [];

  constructor(private router: Router,
    private dialog: MatDialog,
    private disziplinApi: DisziplinApi) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role'); // Rolle aus dem Speicher laden (wichtig beim neuladen der Seite)
    this.username = sessionStorage.getItem('username'); // Benutzernamen aus dem speicher laden (wichtig beim neuladen der Seite)
    if (sessionStorage.getItem('init') == 'true') {
      let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true, data: { initPw: true } } );
      dlg.afterClosed().subscribe(data => dlg.close());
    }
  }

  public loadDD() { //Lädt Disziplinen bei Klick auf Sportarten
    this.disziplinenEinzel = [];
    this.disziplinenTeam = [];
    this.disziplinApi.disziplinGet().subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (!data[i].klassenleistung) {
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


  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
    this.username = null;
    this.navigateToDashboard();
  }
  public login() {
    let dlg = this.dialog.open(LoginComponent); //Login-Overlay öffnen
    dlg.afterClosed().subscribe(data => {
      if (sessionStorage.getItem('init') == 'true') {
        let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true, data: { initPw: true } });
        dlg.afterClosed().subscribe(data => dlg.close());
      }
      dlg.close();
      this.username = sessionStorage.getItem('username'); //Benutzernamen aus dem Local Storage auslesen
      this.role = sessionStorage.getItem('role'); //Rolle aus dem Local Storage auslesen
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
  public navigateToDisziplin(id: number) {
    this.router.navigate(['/disziplin/' + id]);
  }
  public navigateToCreateDisciplineNew() {
    this.router.navigate(['/createDisciplineNew/']);
  }

  public navigateToEinheitVerwalten() {
    this.router.navigate(['/einheitVerwalten/']);
  }

  public openChangePassword() {
    let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true });
    dlg.afterClosed().subscribe(data => dlg.close());
  }

  public navigateToCreateSportfest() {
    this.router.navigate(['/createSportfest']);
  }
}
