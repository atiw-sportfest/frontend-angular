import { Disziplin, Klasse, Schueler, Variable, Ergebnis2, Leistung } from '../interfaces';
import { SportfestService } from '../sportfest.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-einzel',
  templateUrl: './einzel.component.html',
  styleUrls: ['./einzel.component.css']
})

export class EinzelComponent implements OnInit {
  role: string;

  sportartID: number = 0;
  sportart: string ;
  beschreibung: string ;

  variablen: Array<Variable> = [];

  angemeldeteKlassen: Array<Klasse> = [{
    kid: 14,
    name: "FS151"}];

  angemeldeteSchuelerEinerKlasse: Array<Array<Schueler>> = [[]];

  neueLeistung: Leistung = {did: 0, ergebnisse: [], versus: 0};

  klassenMitLeistungen: Array<Klasse> = [];

  schuelerEinerKlasseMitLeistung: Array<Array<Schueler>> = [[]];
  ergebnisseEinesSchuelersEinerKlasse: Array<Array<Array<Ergebnis2>>> = [[[]]];

  bestenSchueler = [];

  aufgeklappt: Array<boolean> = [] ;
  klasseAufklappen: boolean = false;
  sortRev = false;

  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    this.route.params.forEach((params: Params) => {
      //this.sportartID = params['did'];
      this.neueLeistung.did = this.sportartID;
      this.sfService.disziplin(this.sportartID).subscribe((data: Disziplin) => {
        //Disziplin Daten
        this.sportart = data.name;
        this.beschreibung=data.beschreibung;
        this.variablen = data.variablen;
        this.variablen.forEach((variable: Variable) => {
          if(variable.typ.zustaende && variable.typ.zustaende.length == 0){
            variable.typ.zustaende = null;
          }
        });

        //Disziplin Variablen
        this.neueLeistung.ergebnisse = [];
        for(let i = 0; i < this.variablen.length; i++){
          this.neueLeistung.ergebnisse[i] = {
            "var": {var_id: this.variablen[i].var_id}
          };
        }

        //Leistung/Ergebnis eintragen
        /*this.sfService.klassen().subscribe((data: Klasse[]) => {
          this.sfService.klasseMitAnmeldung(this.sportartID).subscribe((klassen: Klasse[]) => {
            this.angemeldeteKlassen = klassen;
            this.angemeldeteKlassen.forEach(klasse => {
              this.sfService.schuelerPerDisziplin(klasse.kid, this.sportartID).subscribe((schueler: Schueler[])=>{
                this.angemeldeteSchuelerEinerKlasse[klasse.kid] = schueler;
              });
            });
          });
          
        },
        (err) => {
          console.error('GET-Service "klassen()" not reachable.');
        });*/

        //Leistung anzeigen
        /*this.sfService.klassenMitLeistung(this.sportartID).subscribe((klassen: Klasse[]) => {
          //Lister der Klassen mit Leistungen
          this.klassenMitLeistungen = klassen;
        });*/
        
        //Liste der Schüler mit Leistung
        this.sfService.schuelerMitLeistungEinerDisziplin(this.sportartID).subscribe((schueler: Schueler[]) => {
          schueler.forEach((einSchueler: Schueler) => {
            if(!this.schuelerEinerKlasseMitLeistung[einSchueler.kid]){
              this.schuelerEinerKlasseMitLeistung[einSchueler.kid] = [];
            }
            this.schuelerEinerKlasseMitLeistung[einSchueler.kid][einSchueler.sid] = einSchueler;
          });
        });
        console.log("schuelerEinerKlasseMitLeistung", this.schuelerEinerKlasseMitLeistung);

        //Liste der Leistungen
        this.sfService.leistungenEinerDisziplin(this.sportartID).subscribe((leistungen: Leistung[]) => {
          leistungen.forEach(leistung => {
            if(!this.ergebnisseEinesSchuelersEinerKlasse[leistung.kid]){
              this.ergebnisseEinesSchuelersEinerKlasse[leistung.kid] = [];
            }
            this.ergebnisseEinesSchuelersEinerKlasse[leistung.kid][leistung.sid] = [];
            leistung.ergebnisse.forEach((ergebnis: Ergebnis2) => {
              this.ergebnisseEinesSchuelersEinerKlasse[leistung.kid][leistung.sid][ergebnis.var.var_id] = ergebnis;
            });
          });
        });
        console.log("avars", this.variablen);
      },
      (err) => {
        console.error('GET-Service "disziplin(sportartID)" not reachable.');
      });
    });
        
    this.bestenSchueler = this.getBesteSchueler();
  }
  
  private getBesteSchueler(): any[] {
    let besteSchueler = [
      {value: 0, viewValue: 'Mirco', ergebnis: 5.2},
      {value: 1, viewValue: 'Michi', ergebnis: 5.3},
      {value: 2, viewValue: 'Maja', ergebnis: 5.4},
      {value: 3, viewValue: 'David', ergebnis: 5.5},
      {value: 4, viewValue: 'Maxi', ergebnis: 5.6},
      {value: 5, viewValue: 'Jonas', ergebnis: 5.7}
    ];
    this.sfService.schuelerMitLeistungEinerDisziplin(this.sportartID).subscribe((data) => {
      console.log(data);
      return besteSchueler;
    },
    (err) => {
      return null;    
    });
    return besteSchueler;
  }

  sicherbar(){
    let sicherbar = true;
    this.neueLeistung.ergebnisse.forEach(ergebnis => {
      if(!ergebnis.wert){
        sicherbar = false;
      }
    });
    return !(this.neueLeistung.kid && this.neueLeistung.sid && sicherbar);
  }
  aufklappen(i: number){
    this.aufgeklappt[i] = !this.aufgeklappt[i];
  }
  switchSort(){
    this.sortRev = !this.sortRev;
  }
  sichern(){
    this.sfService.leistungSchreiben(this.neueLeistung).subscribe(
        (data) => {
          console.log(data);
          this.neueLeistung.sid = null;
          this.neueLeistung.ergebnisse.forEach((ergebnis: Ergebnis2) => {
            ergebnis.wert = null;
          });          
        },
        (err) => {
          console.log(err);
          this.neueLeistung.sid = null;
          this.neueLeistung.ergebnisse.forEach((ergebnis: Ergebnis2) => {
            ergebnis.wert = null;
        });
    });
  }
  public sortByRang(){
    this.switchSort()
    this.bestenSchueler = this.bestenSchueler.sort((n1,n2)=>{
      if(n1.ergebnis>n2.ergebnis){
        return -1;
      }
      if(n1.ergebnis<n2.ergebnis){
        return 1;
      }

      if(n1.ergebnis==n2.ergebnis){
        if(n1.viewValue>n2.viewValue){
          return 1;
        }

        if(n1.viewValue<n2.viewValue){
          return -1;
        }
      }
      return 0;
    });
  }
  
  public sortByRangRev(){
    this.switchSort()
    this.bestenSchueler = this.bestenSchueler.sort((n1,n2)=>{
      if(n1.ergebnis>n2.ergebnis){
        return 1;
      }
      if(n1.ergebnis<n2.ergebnis){
        return -1;
      }

      if(n1.ergebnis==n2.ergebnis){
        if(n1.viewValue>n2.viewValue){
          return -1;
        }

        if(n1.viewValue<n2.viewValue){
          return 1;
        }
      }
      return 0;
    });
  }

  private enoughPermissionsToWrite() {
    let role = localStorage.getItem('role');
    if (role == 'admin' || role == 'schiedsrichter'){
      return true;
    } else {
      return false;
    }
  }
  private enoughPermissionsToChange() {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
