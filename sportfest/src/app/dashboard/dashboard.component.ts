import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErgebnisApi, DisziplinApi, TeilnehmerApi } from '../api/api';
import { Klasse } from "../model/models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export interface KlasseExtended extends Klasse{
  rang: number
}

export class DashboardComponent implements OnInit {
  l: any;
  visibleTeilnehmer: KlasseExtended[];
  sorieterteTeilehmer: any;
  btnText="Alle Anzeigen";
  extended = false;
  constructor(private router: Router, private disziplinApi: DisziplinApi, private ergebnisApi: ErgebnisApi, private teilnehmerApi: TeilnehmerApi) { }

  ngOnInit() {
    let i = 0;
    this.teilnehmerApi.klasseGet().subscribe(data => {
      this.visibleTeilnehmer = data;
      this.visibleTeilnehmer.forEach(element => {
        element.rang = 1;
      });
      this.sortByRang();

      this.l = this.visibleTeilnehmer.length;
      while (i < this.l) {
        this.visibleTeilnehmer[i].rang = i + 1;
        i++;
      }
      this.sorieterteTeilehmer = this.visibleTeilnehmer;
    });
  }

  public sortByRang() {
    if (this.visibleTeilnehmer) {
      this.visibleTeilnehmer = this.visibleTeilnehmer.sort((n1, n2) => {
        if (n1.points > n2.points) {
          return -1;
        }
        if (n1.points < n2.points) {
          return 1;
        }

        if (n1.points == n2.points) {
          if (n1.name > n2.name) {
            return 1;
          }

          if (n1.name < n2.name) {
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
        if (n1.points > n2.points) {
          return 1;
        }
        if (n1.points < n2.points) {
          return -1;
        }

        if (n1.points == n2.points) {
          if (n1.name > n2.name) {
            return -1;
          }

          if (n1.name < n2.name) {
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
        if (n1.name > n2.name) {
          return -1;
        }
        if (n1.name < n2.name) {
          return 1;
        }
        return 0;
      });
    }
  }
  public sortByKlasseRev() {
    if (this.visibleTeilnehmer) {
      this.visibleTeilnehmer = this.visibleTeilnehmer.sort((n1, n2) => {
        if (n1.name > n2.name) {
          return 1;
        }
        if (n1.name < n2.name) {
          return -1;
        }
        return 0;
      });
    }
  }
}
