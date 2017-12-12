import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SportfestService } from '../sportfest.service';
import { FormGroup } from '@angular/forms/src/model';
import _ from "lodash";
import { MatTableDataSource, MatSort } from '@angular/material';
import { DisziplinApi, AnmeldungApi, ErgebnisApi, TeilnehmerApi } from "../api/api";
import { Disziplin, Anmeldung, Ergebnis } from "../model/models";

interface ErgebnisExtended extends Ergebnis {
  rang?: number;
}

@Component({
  selector: 'app-disziplin',
  templateUrl: './disziplin.component.html',
  styleUrls: ['./disziplin.component.css']
})
export class DisziplinComponent implements OnInit {
  //@ViewChild(MatSort) sort: MatSort; //Material Table

  //displayedColumns = []; //Material Table
  disziplin: Disziplin = {};
  anmeldungen: Anmeldung[];
  ergebnisse: ErgebnisExtended[];
  ergebnisseEingetragen: Ergebnis[];
  beschreibung: string;
  //dataSource = new MatTableDataSource(this.ergebnisse); //Material Table
  constructor(private route: ActivatedRoute, private teilnehmerApi: TeilnehmerApi, private ergebnisApi: ErgebnisApi, private disziplinApi: DisziplinApi, private anmeldungApi: AnmeldungApi, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.anmeldungen = [];
      this.disziplin = {};
      this.disziplinApi.disziplinDidGet(+params['id']).subscribe(data => {
        this.disziplin = data;
        /*this.displayedColumns.push('rang'); //Material Table
        if (this.disziplin.klasseteamnleistung)
          this.displayedColumns.push('klasse');
        else
          this.displayedColumns.push('schueler');
        for (let variable of this.disziplin.variablen)
          this.displayedColumns.push(variable.bezeichnung);
        if (this.disziplin.versus)
          this.displayedColumns.push('versus');*/
        this.beschreibung = this.disziplin.team ? "Klasse" : "Schüler";
        this.ergebnisseAbfragen();
        this.initializeAdmin();
        this.anmeldungApi.disziplinDidAnmeldungenGet(this.disziplin.id).subscribe(data => {
          this.anmeldungen = data;
          this.anmeldungen.sort((a1, a2) => { return a1.schueler.klasse.bezeichnung < a2.schueler.klasse.bezeichnung ? -1 : 1; });
        });
      }); // (+) converts string 'id' to a number
    });
  }

  /* ngAfterViewInit() { //Material Table
     this.dataSource.sort = this.sort;
   }*/

  initializeAdmin() {
    //this.leistungen = [[]];
    this.ergebnisseEingetragen = [{
      disziplin: this.disziplin,
      klasse: {},
      leistungen: [],
      schueler: {},
    }];
    for (let i = 0; i < this.disziplin.variablen.length; i++)
      this.ergebnisseEingetragen[0].leistungen.push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });

    // for (let i = 0; i < this.disziplin.variablen.length; i++)
    //   this.leistungen[0].push({
    //     wert: "",
    //     variable: this.disziplin.variablen[i]
    //   });
  }
  enoughPermissionsToWrite() {
    let role = sessionStorage.getItem('role');
    if (role == 'admin' || role == 'schiedsrichter') {
      return true;
    } else {
      return false;
    }
  }

  enoughPermissionsToChange(teilnehmerPos: number, variablePos: number): boolean {
    let role = sessionStorage.getItem('role');
    if (this.ergebnisseEingetragen[teilnehmerPos].leistungen[variablePos].id)
      if (role == 'admin')
        return true;
      else
        return false;
    else
      return true;

    // if (this.leistungen[teilnehmerPos][variablePos].id) //Leistung hat eine ID wenn Sie von der Datenbank kommt
    //   if (role == 'admin') //Wenn Leistung eine ID hat (Also eine "alte Leistung ist"), kann Sie nur ein Admin ändern
    //     return true;
    //   else
    //     return false;
    // else
    //   return true;
  }

  speichern() {
    //fertige Ergebnisse filtern
    let fertigeErgebnisse: Ergebnis[] = [];
    for (var ergebnis of this.ergebnisseEingetragen) {
      fertigeErgebnisse.push({  //Für jeden ausgewählten Teilnehmer (Klasse oder Schüler) ein Ergebnis erzeugen
        disziplin: ergebnis.disziplin,
        klasse: ergebnis.klasse,
        leistungen: ergebnis.leistungen,
        schueler: ergebnis.schueler
      });
    }

    this.ergebnisApi.disziplinDidErgebnissePost(this.disziplin.id, this.ergebnisse);

    this.initializeAdmin();
  }

  teilnehmerHinzufuegen() {
    //Eine Leere Zeile einfügen
    this.ergebnisseEingetragen.push({
      disziplin: this.disziplin,
      klasse: {},
      leistungen: [],
      schueler: {},
    });
    for (var i = 0; i < this.disziplin.variablen.length; i++)
      this.ergebnisseEingetragen[this.ergebnisseEingetragen.length - 1].leistungen.push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });

  }

  teilnehmerLoeschen(teilnehmerPos: number) {
    this.ergebnisseEingetragen.splice(teilnehmerPos, 1)
    if (this.ergebnisseEingetragen.length == 0) {
      this.initializeAdmin();
    }

  }

  anmeldungBereitsGewaehlt(pos: number, anmeldung: Anmeldung): boolean {
    for (let i = 0; i < this.ergebnisseEingetragen.length; i++) {
      if (this.ergebnisseEingetragen[i].schueler.id == anmeldung.schueler.id && i != pos)
        return true;
    }
    return false;
  }

  uniqueKlasse(pos: number) {
    for (let i = 0; i < pos; i++) {
      if (this.disziplin.team) {
        if (this.anmeldungen[i].schueler.klasse.id == this.anmeldungen[pos].schueler.klasse.id)
          return false;
      }
    }
    return true;
  }

  leistungenHolen(ergebnisPos: number) {
    //An dieser Stelle die Leistungen eines Teilnehmers von der Datenbank abrufen
    if (this.disziplin.team) {
      this.teilnehmerApi.klasseKidErgebnisseDidGet(this.ergebnisseEingetragen[ergebnisPos].klasse.id, this.disziplin.id).subscribe(data => {
        this.ergebnisse[ergebnisPos] = <ErgebnisExtended> data;
      });
    } else {
      this.teilnehmerApi.schuelerSidErgebnisseDidGet(this.ergebnisse[ergebnisPos].schueler.id, this.disziplin.id).subscribe(data => {
        this.ergebnisse[ergebnisPos] = <ErgebnisExtended> data;
      })
    }
  }

  speicherBedingungenErfuellt(): boolean {
    //Überprüfen ob in jeder Zeile ein Telnehmer ausgewählt wurde
    for (let eintrag of this.ergebnisseEingetragen)
      if (_.isEmpty(eintrag.schueler))
        return false;
    //Überprüfen ob bei Versus mindestens zwei Teilnehmer eingetragen sind
    if (this.disziplin.versus)
      if (this.ergebnisseEingetragen.length < 2)
        return false;
    //Überprüfen ob für jeden Teilnehmer eine neue Leistung eingetragen wurde und diese der Regex entspricht
    let leistungspruefung: boolean[] = [];
    for (let i = 0; i < this.ergebnisseEingetragen.length; i++) {
      leistungspruefung[i] = false;
      for (let leistung of this.ergebnisseEingetragen[i].leistungen) {
        if (!leistung.id && leistung.wert)  //Wenn es eine Leistung mit eingetragenem Wert, aber keiner id gibt, ist diese neu
          leistungspruefung[i] = true;
        let re = new RegExp(leistung.variable.typ.format); //Regex Prüfung
        if (leistung.wert && !re.test(leistung.wert))
          return false;
      }
    }
    if (!this.enoughPermissionsToChange)
      for (let neueLeistung of leistungspruefung)
        if (!neueLeistung)  //Wenn es eine Zeile ohne eine neue Leistung gibt, kann nicht gespeichert werden.
          return false;
    return true;

  }

  ergebnisseAbfragen() {
    if (this.disziplin) {
      this.ergebnisApi.disziplinDidErgebnisseGet(this.disziplin.id).subscribe(data => {
        let tmp = -1;
        let counter = 0;
        //Nach Punkten sortieren und Rang vergeben
        this.ergebnisse.sort((e1, e2) => e2.punkte - e1.punkte);
        for (let ergebnis of this.ergebnisse) {
          if (ergebnis.punkte != tmp) {
            tmp = ergebnis.punkte;
            counter++;
          }
          ergebnis.rang = counter;
        }
      });
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
        if (this.disziplin.team) {
          if (n1.punkte == n2.punkte) {
            if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
              return 1;
            }

            if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
              return -1;
            }
          }
        } else {
          if (n1.punkte == n2.punkte) {
            if (n1.schueler.nachname > n2.schueler.nachname) {
              return 1;
            }

            if (n1.schueler.nachname < n2.schueler.nachname) {
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
        if (this.disziplin.team) {
          if (n1.punkte == n2.punkte) {
            if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
              return -1;
            }

            if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
              return 1;
            }
          }
        } else {
          if (n1.punkte == n2.punkte) {
            if (n1.schueler.nachname > n2.schueler.nachname) {
              return -1;
            }
            if (n1.schueler.nachname < n2.schueler.nachname) {
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
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
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

  public sortBySchueler() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.schueler.nachname > n2.schueler.nachname) {
          return -1;
        }
        if (n1.schueler.nachname < n2.schueler.nachname) { return 1; }
        return 0;
      });
    }
  }

  public sortBySchuelerRev() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.schueler.nachname > n2.schueler.nachname)
          return 1;

        if (n1.schueler.nachname < n2.schueler.nachname)
          return -1;
        return 0;
      });
    }
  }

}

