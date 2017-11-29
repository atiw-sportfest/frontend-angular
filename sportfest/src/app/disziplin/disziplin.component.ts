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
  beschreibung: string;
  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.anmeldungen = [];
      this.disziplin = {};
      this.sfService.disziplinNEU(+params['id']).subscribe(data => {
        this.disziplin = data;
        this.beschreibung = this.disziplin.klassenleistung ? "Klasse" : "Schüler";
        this.ergebnisseAbfragen();
        this.initializeAdmin();
        this.sfService.anmeldungenAnDisziplin(this.disziplin.id).subscribe(data => {
          this.anmeldungen = data;
        });
      }); // (+) converts string 'id' to a number
    });
  }

  initializeAdmin() {
    this.leistungen = [[]];
    this.selectedAnmeldungen = [{}];
    for (let i = 0; i < this.disziplin.variablen.length; i++)
      this.leistungen[0].push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });
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
    if (this.leistungen[teilnehmerPos][variablePos].id) //Leistung hat eine ID wenn Sie von der Datenbank kommt
      if (role == 'admin') //Wenn Leistung eine ID hat (Also eine "alte Leistung ist"), kann Sie nur ein Admin ändern
        return true;
      else
        return false;
    else
      return true;
  }

  speichern() {
    //fertige Ergebnisse filtern
    let fertigeErgebnisse: ErgebnisNEU[] = [];
    if (this.disziplin.versus) { //Wenn die Disziplin eine Manschaftssportart ist...
      //... müssen alle Leistungen eingetragen sein um ein Ergebnis zu erzeugen.
      let allesEingetragen = true;
      for (let teilnehmer of this.leistungen) { //Einträge überprüfen
        for (let leistung of teilnehmer) {
          if (_.isEmpty(leistung.wert)) {
            allesEingetragen = false;
            break;
          }
        }
      }
      if (allesEingetragen) {
        for (let i = 0; i < this.leistungen.length; i++) {
          fertigeErgebnisse.push({  //Für jeden ausgewählten Teilnehmer (Klasse oder Schüler) ein Ergebnis erzeugen
            disziplin: this.disziplin,
            klasse: this.selectedAnmeldungen[i].schueler.klasse,
            leistungen: this.leistungen[i],
            schueler: this.selectedAnmeldungen[i].schueler,
          });
        }
      }
    } else { // wenn Disziplin eine Individualsportart ist, kann jeder einzelne Teilnehmer bei erfolgreicher Prügung ein Ergebnis bekommen
      for (let i = 0; i < this.leistungen.length; i++) { //Einträge überprüfen
        let allesEingetragen = true;
        for (let leistung of this.leistungen[i]) {
          if (_.isEmpty(leistung.wert)) {
            allesEingetragen = false;
            break;
          }
        }
        if (allesEingetragen) {
          fertigeErgebnisse.push({
            disziplin: this.disziplin,
            klasse: this.selectedAnmeldungen[i].schueler.klasse,
            leistungen: this.leistungen[i],
            schueler: this.selectedAnmeldungen[i].schueler,
          });
        }
      }
    }
    //Fertige Ergebnisse aus den angezeigten Daten löschen.
    for (let ergebnis of fertigeErgebnisse) {
      let index = this.leistungen.indexOf(ergebnis.leistungen);
      if (index > -1) {
        this.leistungen.splice(index, 1);
        this.selectedAnmeldungen.splice(index, 1);
      }
    }

    //Überprüfen welche Leistungen neu, und welche Alt sind.
    for (let i = 0; i < this.leistungen.length; i++) {
      let alteLeistungen: LeistungNEU[] = [];
      let neueLeistungen: LeistungNEU[] = [];
      for (let j = 0; j < this.leistungen[i].length; j++) {
        if (this.leistungen[i][j].id)
          alteLeistungen.push(this.leistungen[i][j]);
        else{
          if(!_.isEmpty(this.leistungen[i][j].wert))
            neueLeistungen.push(this.leistungen[i][j]);
        }
      }
      console.log("Sende neue Leistungen: " + this.disziplin.id + "/" + this.selectedAnmeldungen[i].schueler);
      console.log(neueLeistungen);
      console.log("Sende alte Leistungen: " + this.disziplin.id + "/" + this.selectedAnmeldungen[i].schueler);
      console.log(alteLeistungen);
    }
    console.log("Sende Ergebnisse");
    console.log(fertigeErgebnisse);
    this.initializeAdmin();
  }

  teilnehmerHinzufuegen() {
    //Eine Leere Zeile einfügen
    this.selectedAnmeldungen.push({});
    this.leistungen.push([]);
    for (var i = 0; i < this.disziplin.variablen.length; i++)
      this.leistungen[this.leistungen.length - 1].push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });
  }

  teilnehmerLoeschen(teilnehmerPos: number){
    this.selectedAnmeldungen.splice(teilnehmerPos, 1);
    this.leistungen.splice(teilnehmerPos,1);
    if(this.selectedAnmeldungen.length==0){
      this.initializeAdmin();
    }
  }

  anmeldungBereitsGewaehlt(pos: number, anmeldung: AnmeldungNEU): boolean {
    for (let i = 0; i < this.selectedAnmeldungen.length; i++) {
      if (this.selectedAnmeldungen[i] == anmeldung && i != pos)
        return true;
    }
    return false;
  }

  uniqueKlasse(pos: number) {
    for (let i = 0; i < pos; i++) {
      if (this.disziplin.klassenleistung) {
        if (this.anmeldungen[i].schueler.klasse.id == this.anmeldungen[pos].schueler.klasse.id)
          return false;
      }
    }
    return true;
  }

  leistungenHolen(anmeldungPos: number) {
    //An dieser Stelle die Leistungen eines Teilnehmers von der Datenbank abrufen
    this.sfService.leistungVonDisziplinUndKlasseUndOptionalerSchueler(this.selectedAnmeldungen[anmeldungPos].disziplin, this.selectedAnmeldungen[anmeldungPos].schueler.klasse.id, this.selectedAnmeldungen[anmeldungPos].schueler.sid).subscribe(data => {
      for (let i = data.length; i < this.disziplin.variablen.length; i++)
        data.push({
          wert: "",
          variable: this.disziplin.variablen[i]
        });
      this.leistungen[anmeldungPos] = data;
    });
  }

  regexPruefen(teilnehmerPos: number, variablePos: number) {

    var re = new RegExp(this.disziplin.variablen[variablePos].typ.format);
    if (this.leistungen[teilnehmerPos][variablePos].wert && re.test(this.leistungen[teilnehmerPos][variablePos].wert)) {

    }

  }

  speicherBedingungenErfuellt(): boolean {
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

  ergebnisseAbfragen() {
    if (this.disziplin) {
      this.sfService.ergebnisseVonDisziplin(this.disziplin.id).subscribe(data => {
        this.ergebnisse = data;
        let tmp = -1;
        let counter = 0;
        if (this.disziplin.versus) { //Wenn Versus vorhanden, danach sortieren und neu Numerieren beginnend bei 1
          this.ergebnisse.sort((e1, e2) => e2.versus - e1.versus);
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
        this.ergebnisse.sort((e1, e2) => e2.punkte - e1.punkte);
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
            if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
              return 1;
            }

            if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
              return -1;
            }
          }
        } else {
          if (n1.punkte == n2.punkte) {
            if (n1.schueler.name > n2.schueler.name) {
              return 1;
            }

            if (n1.schueler.name < n2.schueler.name) {
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
            if (n1.klasse.bezeichnung > n2.klasse.bezeichnung) {
              return -1;
            }

            if (n1.klasse.bezeichnung < n2.klasse.bezeichnung) {
              return 1;
            }
          }
        } else {
          if (n1.punkte == n2.punkte) {
            if (n1.schueler.name > n2.schueler.name) {
              return -1;
            }
            if (n1.schueler.name < n2.schueler.name) {
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
        if (n1.schueler.name > n2.schueler.name) {
          return -1;
        }
        if (n1.schueler.name < n2.schueler.name) { return 1; }
        return 0;
      });
    }
  }

  public sortBySchuelerRev() {
    if (this.ergebnisse) {
      this.ergebnisse = this.ergebnisse.sort((n1, n2) => {
        if (n1.schueler.name > n2.schueler.name)
          return 1;

        if (n1.schueler.name < n2.schueler.name)
          return -1;
        return 0;
      });
    }
  }

}

