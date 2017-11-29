import { Disziplin, Klasse, Schueler, Variable, Ergebnis2, Leistung } from './../interfaces';
import { SportfestService } from './../sportfest.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
 
  sportartID: number;
  sportart: string = '';
  beschreibung: string = '';

  kontrahentenAnzahl: number;
  kontrahentenCountHelper: Array<number> = [  ];

  variablen: Array<Variable> = [];
  
  neueLeistungen: Array<Leistung> = [];
 
  versus: Array<number> = [];
  leistungen: Map<number, Array<Leistung>> = new Map<number, Array<Leistung>>();
  
  klassen: Array<Klasse> = [];

  ergebnisse: Array<Ergebnis2>;
  
  punkteStand = [{classA: 'FS151', classB: 'FI151', pointsA: 6, pointsB: 3}, 
                  {classA: 'FI151', classB: 'FI152', pointsA: 2, pointsB: 1}] // TODO

  selectedClassA: number;
  selectedClassB: number;
  pointsA: number;
  pointsB: number;
  sortRevA = true;
  sortRevB = true;
    
  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.sportartID = params['did'];
      this.sfService.disziplin(this.sportartID).subscribe((data: Disziplin) => {
        //Disziplin Daten
        this.sportart = data.name;
        this.beschreibung = data.beschreibung;
        this.variablen = data.variablen;
        this.variablen.forEach((variable: Variable) => {
          if(variable.typ.zustaende && variable.typ.zustaende.length == 0){
            variable.typ.zustaende = null;
          }
        });
        this.kontrahentenAnzahl = data.kontrahentenAnzahl;

        //Disziplin Variablen
        for(let i = 0; i < this.kontrahentenAnzahl; i++){
          this.neueLeistungen[i] = {did: this.sportartID, ergebnisse: [], versus: 0};
          this.kontrahentenCountHelper[i] = i;
          for(let j = 0; j < this.variablen.length; j++){
            this.neueLeistungen[i].ergebnisse[j] = {
              "var": {var_id: this.variablen[j].var_id}
            };
          }
        }
        this.sfService.klassen().subscribe((klassenData: Klasse[]) => {
          this.klassen = klassenData;
        });
        this.sfService.leistungenEinerDisziplin(this.sportartID).subscribe((leistungenData: Leistung[]) => {
          leistungenData.forEach((leistung: Leistung) => {
            if(this.leistungen.get(leistung.versus)){
              let leistungen = this.leistungen.get(leistung.versus);
              leistungen[leistungen.length] = leistung;
            }else{
              this.leistungen.set(leistung.versus, [leistung]);
              this.versus[this.versus.length] = leistung.versus;
            }
          });
        });        
      });      
    });
  }

  getKlassenNameById(kid: number){
    let result = "";
    this.klassen.forEach((klasse: Klasse) => {
      if(klasse.id == kid){
        result = klasse.bezeichnung;
      }
    });
    return result;
  }
  
  public sichern() {
    console.log("neueLeistungen", this.neueLeistungen);
    this.sfService.leistungenSchreiben(this.neueLeistungen).subscribe(
      (data) => {
        console.log(data);
        for(let i = 0; i < this.kontrahentenAnzahl; i++){
          this.neueLeistungen[i].kid = null;
          this.neueLeistungen[i].ergebnisse.forEach(ergebnis => {
            ergebnis.wert = null;
          });            
        }                 
      },
      (err) => {
        console.log(err);
        for(let i = 0; i < this.kontrahentenAnzahl; i++){
          this.neueLeistungen[i].kid = null;
          this.neueLeistungen[i].ergebnisse.forEach(ergebnis => {
            ergebnis.wert = null;
          });            
        }         
      }
    );
  }

  private enoughPermissionsToWrite() {
    let role = sessionStorage.getItem('role');
    if (role == 'admin' || role == 'schiedsrichter'){
      return true;
    } else {
      return false;
    }
  }
  
  // // Sortieren
  // switchSortA(){
  //   this.sortRevA = !this.sortRevA;
  // }
  // switchSortB(){
  //   this.sortRevB = !this.sortRevB;
  // }  
  // public sortByClassA() {
  //   this.switchSortA();
  //   this.punkteStand = this.punkteStand.sort((n1,n2)=> {
  //     if (n1.classA>n2.classA) {
  //       return -1;
  //     }
  //     if (n1.classA<n2.classA) {
  //       return 1;
  //     }
  //     if (n1.classA==n2.classA) {
  //       if (n1.pointsA>n2.pointsA) {
  //         return 1;
  //       }
  //       if (n1.pointsA<n2.pointsA) {
  //         return -1;
  //       }
  //     }
  //     return 0;
  //   });
  // }
  // public sortByClassARev() {
  //   this.switchSortA();
  //   this.punkteStand = this.punkteStand.sort((n1,n2)=>{
  //     if(n1.classA>n2.classA){
  //       return 1;
  //     }
  //     if(n1.classA<n2.classA){
  //       return -1;
  //     }

  //     if(n1.classA==n2.classA){
  //       if(n1.pointsA>n2.pointsA){
  //         return -1;
  //       }

  //       if(n1.pointsA<n2.pointsA){
  //         return 1;
  //       }
  //     }
  //     return 0;
  //   });
  // }
  // public sortByClassB(){
  //   this.switchSortB()
  //   this.punkteStand = this.punkteStand.sort((n1,n2)=>{
  //     if(n1.classB>n2.classB){
  //       return -1;
  //     }
  //     if(n1.classB<n2.classB){
  //       return 1;
  //     }

  //     if(n1.classB==n2.classB){
  //       if(n1.pointsB>n2.pointsB){
  //         return 1;
  //       }

  //       if(n1.pointsB<n2.pointsB){
  //         return -1;
  //       }
  //     }
  //     return 0;
  //   });
  // }
  // public sortByClassBRev(){
  //   this.switchSortB();
  //   this.punkteStand = this.punkteStand.sort((n1,n2)=>{
  //     if(n1.classB>n2.classB){
  //       return 1;
  //     }
  //     if(n1.classB<n2.classB){
  //       return -1;
  //     }

  //     if(n1.classB==n2.classB){
  //       if(n1.pointsB>n2.pointsB){
  //         return -1;
  //       }

  //       if(n1.pointsB<n2.pointsB){
  //         return 1;
  //       }
  //     }
  //     return 0;
  //   });
  // }
}
