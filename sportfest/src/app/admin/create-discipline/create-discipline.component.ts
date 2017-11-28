import { ActivatedRoute, Params, Router } from '@angular/router';
import { Variable, Regel, Disziplin } from '../../interfaces';
import { SportfestService } from '../../sportfest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-discipline',
  templateUrl: './create-discipline.component.html',
  styleUrls: ['./create-discipline.component.css']
})
export class CreateDisciplineComponent implements OnInit {
  sportartID: number;
  sportart: string;
  beschreibung: string;
  minTeilnehmeranzahl: number;
  maxTeilnehmeranzahl: number;
  teamleistung: boolean = false;
  kontrahentenAnzahl: number;

  datentypen: any[];

  secondVisible = true;
  rulesVar: Array<Variable>;
  rules: Array<Regel>;
  dummynumber: number;

  constructor(private sfService: SportfestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.sportartID = +params['did'];
    });
    if (this.sportartID) {
      // Disziplin holen (beim Ändern)
      this.sfService.disziplin(this.sportartID).subscribe((data: Disziplin) => {
        this.sportart = data.name;
        this.beschreibung = data.beschreibung;
        this.minTeilnehmeranzahl = data.minTeilnehmer;
        this.maxTeilnehmeranzahl = data.maxTeilnehmer;
        this.teamleistung = data.teamleistung;
        this.kontrahentenAnzahl = data.kontrahentenAnzahl;
        this.rules = [];
        for (let i = data.regeln.length - 1; i >= 0; i--) {
          this.rules[(data.regeln.length - 1) - i] = data.regeln[i];
        }
        this.rulesVar = data.variablen;
        if (!this.rules) {
          this.rules = [];
        }
        if (!this.rulesVar) {
          this.rulesVar = []
        }
      },
        (err) => {
          console.error('GET-Service "disziplin(sportartID)" not reachable.');
        });
    } else {
      this.rules = [];
      this.rulesVar = []
      this.addNewRuleVarLine();
      this.addNewRuleLine();
    }
    // Datentypen holen
    this.sfService.datentypenHolen().subscribe(
      (data) => {
        this.datentypen = data;
      },
      (err) => {
        console.error('GET-Service "datentypenHolen()" not reachable.');
      }
    )
  }

  public sendToBackend() {
    // Idizees der Regeln setzen
    for (let i = 0; i < this.rules.length; i++) {
      this.rules[i].index = i + '';
    }
    let disziplinDTO = {
      name: this.sportart,
      beschreibung: this.beschreibung,
      minTeilnehmer: this.minTeilnehmeranzahl,
      maxTeilnehmer: this.maxTeilnehmeranzahl,
      aktiviert: true,
      teamleistung: this.teamleistung,
      kontrahentenAnzahl: this.kontrahentenAnzahl,
      variablen: this.rulesVar,
      regeln: this.rules,
    }

    if(!disziplinDTO.kontrahentenAnzahl){
      disziplinDTO.kontrahentenAnzahl = 1;
    }

    console.log("disziplinDTO", disziplinDTO);

    if (this.sportartID) {
      this.sfService.disziplinAendern(this.sportartID, disziplinDTO).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.sfService.disziplinSchreiben(disziplinDTO).subscribe(
        (data) => {
          console.log(data);
          if (data.teamleistung)
            this.router.navigate(["team/"+data.did+"/"+data.name]);
          else
            this.router.navigate(["einzel/"+data.did+"/"+data.name]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getAufAbsteigend(aufab: boolean) {
    if(aufab){
      return "Aufsteigend";
    }else{
      return "Absteigen";
    }
  }

  addNewRuleVarLine() {
    let line: Variable = {
      var_id: 0,
      name: '',
      expressionParameter: '',
      desc: '',
      sortAsc: false,
      sortIndex: 0,
      typ:
      {
        tid: ''
      }
    }
    this.rulesVar.push(line);
  }

  removeRuleVarLine(index: number) {
    this.rulesVar.splice(index, 1);
  }

  addNewRuleLine() {
    let rule: Regel = {
      expression: '',
      points: this.dummynumber
    };
    this.rules.push(rule);
  }

  removeRuleLine(index: number) {
    this.rules.splice(index, 1);
  }

  addNewRuleSet(){

  }

  submit() {
    this.secondVisible = true;
  }
}
