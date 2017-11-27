import { Component, OnInit } from '@angular/core';
import { DisziplinNEU, AnmeldungNEU, LeistungNEU, ErgebnisNEU } from '../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { SportfestService } from '../sportfest.service';
import { FormGroup } from '@angular/forms/src/model';
import _ from "lodash";
@Component({
  selector: 'app-disziplin',
  templateUrl: './disziplin.component.html',
  styleUrls: ['./disziplin.component.css']
})
export class DisziplinComponent implements OnInit {

  disziplin: DisziplinNEU = {};
  anmeldungen: AnmeldungNEU[];
  selectedAnmeldungen: AnmeldungNEU[];
  leistungen: LeistungNEU[][];
  ergebnisse: ErgebnisNEU[];
  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.anmeldungen = [];
      this.disziplin = {};
      this.sfService.disziplinNEU(+params['id']).subscribe(data => {
        this.disziplin = data;
        this.ergebnisseAbfragen();
        this.initializeAdmin();
        this.sfService.anmeldungenAnDisziplin(this.disziplin.id).subscribe(data => {
          this.anmeldungen = data;
        });
      }); // (+) converts string 'id' to a number
    });
    console.log('AfterView');
  }

  private initializeAdmin() {
    this.leistungen = [[]];
    this.selectedAnmeldungen = [{}];
    for (let i = 0; i < this.disziplin.variablen.length; i++)
      this.leistungen[0].push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });
  }
  private enoughPermissionsToWrite() {
    let role = sessionStorage.getItem('role');
    if (role == 'admin' || role == 'schiedsrichter') {
      return true;
    } else {
      return false;
    }
  }

  private speichern() {
    //Hier an die Schnittstelle senden. Unterscheiden zwishcen neuen und alten leistungen.
    let alteLeistungen = [];
    let neueLeistungen = [];
    for (let i = 0; i < this.leistungen.length; i++) {
      alteLeistungen.push([]);
      neueLeistungen.push([]);
      for (let j = 0; j < this.leistungen[i].length; j++) {
        if (this.leistungen[i][j].id)
          alteLeistungen[i].push(this.leistungen[i][j]);
        else
          neueLeistungen[i].push(this.leistungen[i][j])
      }
    }
    this.initializeAdmin();
    console.log(this.selectedAnmeldungen);
    console.log(this.leistungen);
  }

  private teilnehmerHinzufuegen() {
    //Eine Leere Zeile einfügen
    this.selectedAnmeldungen.push({});
    this.leistungen.push([]);
    for (var i = 0; i < this.disziplin.variablen.length; i++)
      this.leistungen[this.leistungen.length - 1].push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });
  }

  private anmeldungBereitsGewaehlt(pos: number, anmeldung: AnmeldungNEU): boolean {
    for (let i = 0; i < this.selectedAnmeldungen.length; i++) {
      if (this.selectedAnmeldungen[i] == anmeldung && i != pos)
        return true;
    }
    return false;
  }

  private uniqueKlasse(pos: number) {
    for (let i = 0; i < pos; i++) {
      if (this.disziplin.klassenleistung) {
        if (this.anmeldungen[i].schueler.klasse.kid == this.anmeldungen[pos].schueler.klasse.kid)
          return false;
      }
    }
    return true;
  }

  private leistungenHolen(anmeldung: AnmeldungNEU) {
    console.log("Not yet implemented");
    //An dieser Stelle die Leistungen eines Teilnehmers von der Datenbank abrufen
    //
  }

  private regexPruefen(teilnehmerPos: number, variablePos: number) {

    var re = new RegExp(this.disziplin.variablen[variablePos].typ.format);
    if (this.leistungen[teilnehmerPos][variablePos].wert && re.test(this.leistungen[teilnehmerPos][variablePos].wert)) {

    }

  }

  private speicherBedingungenErfuellt(): boolean {
    //Überprüfen ob in jeder Zeile ein Telnehmer ausgewählt wurde
    for (let eintrag of this.selectedAnmeldungen)
      if (_.isEmpty(eintrag))
        return false;
    //Überprüfen ob bei Versus mindestens zwei Teilnehmer eingetragen sind
    if (this.disziplin.versus)
      if (this.selectedAnmeldungen.length < 2)
        return false;
    //Überprüfen ob für jeden Teilnehmer eine neue Leistung eingetragen wurde und diese der Regex entspricht
    let leistungspruefung: boolean[] = [];
    for (let i = 0; i < this.leistungen.length; i++) {
      leistungspruefung[i] = false;
      for (let leistung of this.leistungen[i]) {
        if (!leistung.id && leistung.wert)  //Wenn es eine Leistung mit eingetragenem Wert, aber keiner id gibt, ist diese neu
          leistungspruefung[i] = true;
        let re = new RegExp(leistung.variable.typ.format); //Regex Prüfung
        if (leistung.wert && !re.test(leistung.wert))
          return false;
      }
    }
    for (let neueLeistung of leistungspruefung)
      if (!neueLeistung)  //Wenn es eine Zeile ohne eine neue Leistung gibt, kann nicht gespeichert werden.
        return false;
    return true;
  }

  private ergebnisseAbfragen() {
    if (this.disziplin) {
      this.sfService.ergebnisseVonDisziplin(this.disziplin.id).subscribe(data => {
        this.ergebnisse = data;
        let tmp = -1;
        let counter = 0;
        if (this.disziplin.versus) { //Wenn Versus vorhanden, danach sortieren und neu Numerieren beginnend bei 1
          this.ergebnisse.sort((e1, e2) => e1.versus - e2.versus);
          for (let ergebnis of this.ergebnisse) {
            if (ergebnis.versus != tmp) {
              tmp = ergebnis.versus;
              counter++;
            }
            ergebnis.visibleVersus = counter;
          }
        }

        tmp = -1;
        counter = 0;
        //Nach Punkten sortieren und Rang vergeben
        this.ergebnisse.sort((e1, e2) => e1.punkte - e2.punkte);
        for (let ergebnis of this.ergebnisse) {
          if (ergebnis.punkte != tmp) {
            tmp = ergebnis.punkte;
            counter++;
          }
          ergebnis.rang = counter;
        }
      })

    } else {
      console.error("Keine Disziplin vorhanden");
    }
  }

  /*
    Sortieralgorithmen
  */

  public sortByRang() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.punkte > n2.punkte) {
          return -1;
        }
        if (n1.punkte < n2.punkte) {
          return 1;
        }
        if (this.disziplin.klassenleistung) {
          if (n1.punkte == n2.punkte) {
            if (n1.klasse > n2.klasse) {
              return 1;
            }

            if (n1.klasse < n2.klasse) {
              return -1;
            }
          }
        } else {
          if (n1.punkte == n2.punkte) {
            if (n1.schueler > n2.schueler) {
              return 1;
            }

            if (n1.schueler < n2.schueler) {
              return -1;
            }
          }
        }
        return 0;
      });
    }
  }
  public sortByRangRev() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.punkte > n2.punkte) {
          return 1;
        }
        if (n1.punkte < n2.punkte) {
          return -1;
        }
        if (this.disziplin.klassenleistung) {
          if (n1.punkte == n2.punkte) {
            if (n1.klasse > n2.klasse) {
              return -1;
            }

            if (n1.klasse < n2.klasse) {
              return 1;
            }
          }
        } else {
          if (n1.punkte == n2.punkte) {
            if (n1.schueler > n2.schueler) {
              return -1;
            }
            if (n1.schueler < n2.schueler) {
              return 1;
            }
          }
        }
        return 0;
      });
    }
  }

  public sortByKlasse() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.klasse > n2.klasse) {
          return -1;
        }
        if (n1.klasse < n2.klasse) {
          return 1;
        }
        return 0;
      });
    }
  }

  public sortByKlasseRev() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.klasse > n2.klasse) {
          return 1;
        }
        if (n1.klasse < n2.klasse) {
          return -1;
        }
        return 0;
      });
    }
  }

  public sortBySchueler() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.schueler > n2.schueler) {
          return -1;
        }
        if (n1.schueler < n2.schueler) { return 1; }
        return 0;
      });
    }
  }

  public sortBySchuelerRev() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.schueler > n2.schueler)
          return 1;

        if (n1.schueler < n2.schueler)
          return -1;
        return 0;
      });
    }
  }

}

