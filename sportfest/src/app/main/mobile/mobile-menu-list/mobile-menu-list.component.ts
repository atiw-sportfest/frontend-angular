import { LoginComponent } from '../../login/login.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Disziplin } from "../../../model/models";
import { DisziplinApi } from "../../../api/api";

@Component({
  selector: 'app-mobile-menu-list',
  templateUrl: './mobile-menu-list.component.html',
  styleUrls: ['./mobile-menu-list.component.css']
})
export class MobileMenuListComponent implements OnInit {

  @Input() role: string;
  @Output() itemSelected = new EventEmitter<any>();

  selectedSportarten = false;
  selectedEinzel = false;
  selectedTeam = false;
  selectedAdmin = false;

  disziplinenTeam: Array<Disziplin> = [];
  disziplinenEinzel: Array<Disziplin> = [];

  constructor(private router: Router,
    private disziplinApi: DisziplinApi) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
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

  public navigateToDisziplin(id: number) {
    this.router.navigate(['/disziplin/' + id]);
    this.itemSelected.emit();
  }
  public navigateToDashboard() {
    this.router.navigate(['/home']);
    this.itemSelected.emit();
  }
  public navigateToCreateDiscipline() {
    this.router.navigate(['/createDisciplineNew']);
    this.itemSelected.emit();
  }
  public navigateToImportKlasse() {
    this.router.navigate(['/import']);
    this.itemSelected.emit();
  }
  public navigateToActivateDiscipline() {
    this.router.navigate(['/activateDiscipline']);
    this.itemSelected.emit();
  }
  public navigateToUAC() {
    this.router.navigate(['/uac']);
    this.itemSelected.emit();
  }
  public openChangePassword() {
    // let dlg = this.dialog.open(PasswordChangeComponent, { disableClose: true });
    // dlg.componentInstance.pwCancel.subscribe(data => dlg.close());
    // dlg.componentInstance.pwSave.subscribe(data => dlg.close());
    this.itemSelected.emit();
  }
  public navigateToCreateSportfest() {
    this.router.navigate(['/createSportfest']);
    this.itemSelected.emit();
  }

    public navigateToEinheitVerwalten() {
    this.router.navigate(['/einheitVerwalten/']);
  }

  public expandSportarten() {

    if (this.selectedSportarten) {
      this.selectedSportarten = false;
    } else {
      this.selectedAdmin = false;
      this.selectedEinzel = false;
      this.selectedTeam = false;
      this.selectedSportarten = true;
    }
  }
  public expandAdmin() {
    if (this.selectedAdmin) {
      this.selectedAdmin = false;
    } else {
      this.selectedSportarten = false;
      this.selectedAdmin = true;
    }
  }
  public expandEinzel() {
    if (this.selectedEinzel) {
      this.selectedEinzel = false;
    } else {
      this.selectedTeam = false;
      this.selectedEinzel = true;
    }
  }
  public expandTeam() {
    if (this.selectedTeam) {
      this.selectedTeam = false;
    } else {
      this.selectedEinzel = false;
      this.selectedTeam = true;
    }
  }


}
