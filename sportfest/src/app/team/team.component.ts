import { Disziplin, Klasse, Schueler } from './../interfaces';
import { SportfestService } from './../sportfest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  sportart: Disziplin = {};
  beschreibung: string = '';
  klassen: Array<Klasse> = [];
  
  did: number;  

  punkteStand = [{classA: 'FS151', classB: 'FI151', pointsA: 6, pointsB: 3}, 
                  {classA: 'FI151', classB: 'FI152', pointsA: 2, pointsB: 1}] // TODO

  selectedClassA: number;
  selectedClassB: number;
  pointsA: number;
  pointsB: number;

  sortRevA = true;
  sortRevB = true;
  
  anzahlSpalten;
  
  ergebnisse = [
    {
      tid:'',
      variablen: [
        {
          id: '',
          value: ''
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, 
              private sfService: SportfestService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.did = params['did'];
      this.sfService.disziplin(this.did).subscribe((data: Disziplin) => {
        console.log('team-data');
        console.log(data);
        this.sportart = data.name;
        this.anzahlSpalten = new Array<number>(this.sportart.kontrahentenAnzahl);
        this.beschreibung = data.beschreibung;
      },
      (err) => {
        console.error('GET-Service "disziplin(sportartID)" not reachable.');
      });
      
      this.sfService.klassen().subscribe((data: Klasse[]) => {
        this.klassen = data;
      },
      (err) => {
        console.error('GET-Service "klassen()" not reachable.');
      })
    });
  }
  
  sendTeamErgebnis(classA: number, classB: number, pointsA: number, pointsB: number){
    //Clear Inputs
    this.selectedClassA = null;
    this.selectedClassB = null;
    this.pointsA = null;
    this.pointsB = null;
    //Hier senden
    //TODO richtiges JSON
    this.sfService.ergebnisSchreiben(this.did, [{classA, pointsA}, {classB, pointsB}]);
  }
  
  public setVarValues(vid: number, ki: number, vi: number, event: any) {
    console.log(event);
  }

  // Sortieren
  switchSortA(){
    this.sortRevA = !this.sortRevA;
  }
  switchSortB(){
    this.sortRevB = !this.sortRevB;
  }  
  public sortByClassA() {
    this.switchSortA();
    this.punkteStand = this.punkteStand.sort((n1,n2)=> {
      if (n1.classA>n2.classA) {
        return -1;
      }
      if (n1.classA<n2.classA) {
        return 1;
      }
      if (n1.classA==n2.classA) {
        if (n1.pointsA>n2.pointsA) {
          return 1;
        }
        if (n1.pointsA<n2.pointsA) {
          return -1;
        }
      }
      return 0;
    });
  }
  public sortByClassARev() {
    this.switchSortA();
    this.punkteStand = this.punkteStand.sort((n1,n2)=>{
      if(n1.classA>n2.classA){
        return 1;
      }
      if(n1.classA<n2.classA){
        return -1;
      }

      if(n1.classA==n2.classA){
        if(n1.pointsA>n2.pointsA){
          return -1;
        }

        if(n1.pointsA<n2.pointsA){
          return 1;
        }
      }
      return 0;
    });
  }
  public sortByClassB(){
    this.switchSortB()
    this.punkteStand = this.punkteStand.sort((n1,n2)=>{
      if(n1.classB>n2.classB){
        return -1;
      }
      if(n1.classB<n2.classB){
        return 1;
      }

      if(n1.classB==n2.classB){
        if(n1.pointsB>n2.pointsB){
          return 1;
        }

        if(n1.pointsB<n2.pointsB){
          return -1;
        }
      }
      return 0;
    });
  }
  public sortByClassBRev(){
    this.switchSortB();
    this.punkteStand = this.punkteStand.sort((n1,n2)=>{
      if(n1.classB>n2.classB){
        return 1;
      }
      if(n1.classB<n2.classB){
        return -1;
      }

      if(n1.classB==n2.classB){
        if(n1.pointsB>n2.pointsB){
          return -1;
        }

        if(n1.pointsB<n2.pointsB){
          return 1;
        }
      }
      return 0;
    });
  }
}
