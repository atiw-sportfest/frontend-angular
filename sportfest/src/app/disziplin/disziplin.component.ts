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
  form: FormGroup;
  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leistungen = [[]];
      this.selectedAnmeldungen = [{}];
      this.anmeldungen = [];
      this.disziplin = {};
      this.sfService.disziplinNEU(+params['id']).subscribe(data => {
        this.disziplin = data;
        this.sfService.anmeldungenAnDisziplin(this.disziplin.id).subscribe(data => {
          this.anmeldungen = data;
        });
        this.sfService.ergebnisseVonDisziplin(this.disziplin.id).subscribe(data => {
          this.ergebnisse = data;
        })
        for (let i = 0; i < this.disziplin.variablen.length; i++)
          this.leistungen[0].push({
            wert: "",
            variable: this.disziplin.variablen[i]
          });
      }); // (+) converts string 'id' to a number
    });
    console.log('AfterView');
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
    this.leistungen = [[]];
    this.selectedAnmeldungen = [{}];
    for (let i = 0; i < this.disziplin.variablen.length; i++)
      this.leistungen[0].push({
        wert: "",
        variable: this.disziplin.variablen[i]
      });
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
      if(this.selectedAnmeldungen[i] == anmeldung && i != pos)
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

  private regexpPruefen(regexp: string, input: string) {
    console.log("Regex: " + regexp);
    console.log("Input:" + input);

    var re = new RegExp(regexp);
    if (re.test(input)) {
      //idee haben was man hier tun kann
    }

  }

  private speicherBedingungenErfuellt(): boolean {
    //Überprüfen ob in jeder Zeile ein Telnehmer ausgewählt wurde
    for (let eintrag of this.selectedAnmeldungen)
        if(_.isEmpty(eintrag))
          return false;
    //Überprüfen ob bei Versus mindestens zwei Teilnehmer eingetragen sind
    if (this.disziplin.versus)
      if (this.selectedAnmeldungen.length < 2)
        return false;
    //Überprüfen ob für jeden Teilnehmer eine neue Leistung eingetragen wurde
    let leistungspruefung: boolean[] = [];
    for (let i = 0; i < this.leistungen.length; i++) {
      leistungspruefung[i] = false;
      for (let leistung of this.leistungen[i])
        if (!leistung.id && leistung.wert)
          leistungspruefung[i] = true;
    }
    for(let neueLeistung of leistungspruefung)
      if(!neueLeistung)
        return false;
    return true;
  }

}
