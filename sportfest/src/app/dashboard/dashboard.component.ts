import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErgebnisApi, DisziplinApi, TeilnehmerApi } from '../api/api';
import { Klasse, Ergebnis } from "../model/models";


//Lokale Klasse
interface ErgebnisExtended extends Ergebnis{
  rang: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  l: any;
  visibleTeilnehmer: ErgebnisExtended[];
  sorieterteTeilehmer: ErgebnisExtended[];
  btnText="Alle Anzeigen";
  extended = false;
  constructor(private router: Router, private disziplinApi: DisziplinApi, private ergebnisApi: ErgebnisApi, private teilnehmerApi: TeilnehmerApi) { }

  ngOnInit() {
    let i = 0;
    this.teilnehmerApi.klasseKidErgebnisseGet(1).subscribe(data => {    //Falsche Schnittstelle
      this.visibleTeilnehmer = <ErgebnisExtended[]> data;
      this.sortByRang();
      for (var i =0; i<this.visibleTeilnehmer.length; i++) {
        this.visibleTeilnehmer[i].rang = i + 1;
      }
      this.sorieterteTeilehmer = this.visibleTeilnehmer;
    });
  }

  public sortByRang() {
    if (this.visibleTeilnehmer) {
      this.visibleTeilnehmer = this.visibleTeilnehmer.sort((n1, n2) => {
        if (n1.punkte > n2.punkte) {
          return -1;
        }
        if (n1.punkte < n2.punkte) {
          return 1;
        }

        if (n1.punkte == n2.punkte) {
          if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
            return 1;
          }

          if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
            return -1;
          }
        }
        return 0;
      });
    }
  }
  public sortByRangRev() {
    if (this.visibleTeilnehmer) {
      this.visibleTeilnehmer = this.visibleTeilnehmer.sort((n1, n2) => {
        if (n1.punkte > n2.punkte) {
          return 1;
        }
        if (n1.punkte < n2.punkte) {
          return -1;
        }

        if (n1.punkte == n2.punkte) {
          if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
            return -1;
          }

          if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
            return 1;
          }
        }
        return 0;
      });
    }
  }
  public toggleVisible() {
    if (!this.extended) {
      this.extended=true;
      this.btnText = "Weniger Anzeigen";
    } else {
      this.extended=false;
      this.btnText = "Alle Anzeigen";
    }
  
  }
  
  public sortByKlasse() {
    if (this.visibleTeilnehmer) {
      this.visibleTeilnehmer = this.visibleTeilnehmer.sort((n1, n2) => {
        if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
          return -1;
        }
        if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
          return 1;
        }
        return 0;
      });
    }
  }
  public sortByKlasseRev() {
    if (this.visibleTeilnehmer) {
      this.visibleTeilnehmer = this.visibleTeilnehmer.sort((n1, n2) => {
        if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
          return 1;
        }
        if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
          return -1;
        }
        return 0;
      });
    }
  }
}
