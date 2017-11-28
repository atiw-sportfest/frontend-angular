import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SportfestService } from '../sportfest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  l: any;
  visibleTeilnehmer: any;
  sorieterteTeilehmer: any;
  btnText="Alle Anzeigen";
  extended = false;
  constructor(private router: Router, private sfService: SportfestService) { }

  ngOnInit() {
    let i = 0;
    this.sfService.klassen().subscribe(data => {
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
