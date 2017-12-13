import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
//import { DisziplinNEU, VariableNEU, TypNEU, RegelNEU } from '../../interfaces';
import { SportfestService } from '../../sportfest.service';
import { Disziplin } from '../../model/Disziplin';
import { Variable } from '../../model/Variable';
import { Script } from '../../model/Script';
import { Typ } from '../../model/Typ';
import { DisziplinApi, MetaApi } from '../../api/api';

@Component({
  selector: 'app-create-discipline-new',
  templateUrl: './create-discipline-new.component.html',
  styleUrls: ['./create-discipline-new.component.css']
})
export class CreateDisciplineNewComponent implements OnInit {
  idDerDisziplin: number;
  nameDerDisziplin: string;
  beschreibungDerDisziplin: string;
  team: boolean;
  anzahlDerVersuchen: number;
  versus: boolean;
  fehlermeldung: string

  arrayOfVars: Variable[];

  regelString: string;
  regel: string;

  einheitPool: Typ[];
  selectedEinheit: Typ;
  statusCodeText: string;
  statusCodeIcon: string;

  syntaxCorrect: boolean;
  //TODO sfService entfernen

  constructor(private metaApi: MetaApi, private disziplinApi: DisziplinApi, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.fehlermeldung = "";
    this.metaApi.typGet().subscribe(data => {
      this.einheitPool = data;

      this.route.params.forEach((params: Params) => {
        this.idDerDisziplin = +params['id'];
        if (this.idDerDisziplin) {

          this.disziplinApi.disziplinDidGet(this.idDerDisziplin).subscribe((data: Disziplin) => {
            this.nameDerDisziplin = data.bezeichnung;
            this.beschreibungDerDisziplin = data.beschreibung;
            this.team = data.team;
            this.regel = data.regeln;
            this.assignVars(data.variablen);
            this.versus = data.versus;

            this.statusCodeText = "Der Code ist Syntaktisch richtig";
            this.statusCodeIcon = "done";
            this.syntaxCorrect = true;
          });
        } else {
          this.regel = "";
          this.idDerDisziplin = null;
          this.nameDerDisziplin = "";
          this.beschreibungDerDisziplin = "";
          this.team = false;
          this.arrayOfVars = [];
          this.versus = false;

          this.statusCodeText = "Code nicht Überprüft";
          this.statusCodeIcon = "error";
          this.syntaxCorrect = false;


        }
      });
    });
  }

  deleteVar(i: number) {
    this.arrayOfVars.splice(i, 1);
  }

  addVar() {
    let dummyVar = { bezeichnung: "", typNEU: {} }
    this.arrayOfVars.push(dummyVar);
  }

  checkCode() {

    this.statusCodeText = "Code wird überprüft";
    var script: Script = {script: this.regel};
    this.metaApi.dslCheckRegelPost(script).subscribe(data => {
      this.syntaxCorrect = data.pass;
      this.fehlermeldung = data.messages;


      if (this.syntaxCorrect) {
        this.statusCodeText = "Der Code ist Syntaktisch richtig";
        this.statusCodeIcon = "done";
      } else {
        this.statusCodeText = this.fehlermeldung;
        this.statusCodeIcon = "error";
      }
    });


    if (this.syntaxCorrect) {
      this.statusCodeText = "Der Code ist Syntaktisch richtig";
      this.statusCodeIcon = "done";
    } else {
      this.statusCodeText = this.fehlermeldung;
      this.statusCodeIcon = "error";
    }

  }

  textChanged() {
    this.statusCodeText = "Code nicht Überprüft";
    this.statusCodeIcon = "error";
    this.syntaxCorrect = false;
  }

  assignVars(vars: Variable[]) {
    for (let outer = 0; outer < vars.length; outer++) {
      for (let inner = 0; inner < this.einheitPool.length; inner++) {
        if (vars[outer].typ.id == this.einheitPool[inner].id) {
          vars[outer].typ = this.einheitPool[inner];
          break;
        }
      }
    }
    this.arrayOfVars = vars;
  }

  sendToBackend() {
    let disziplinDTO: Disziplin;
    disziplinDTO = {
      id: this.idDerDisziplin,
      bezeichnung: this.nameDerDisziplin,
      beschreibung: this.beschreibungDerDisziplin,
      aktiviert: true,
      regeln: this.regel,
      team: this.team,
      variablen: this.arrayOfVars,
      versus: this.versus
    }

    if (disziplinDTO.id) { //Disziplin existiert schon
      this.disziplinApi.disziplinDidPost(disziplinDTO.id, disziplinDTO).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        });
    } else { //Neue Disziplin
      this.disziplinApi.disziplinPost(disziplinDTO).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(["/disziplin/" + disziplinDTO.id]);
        },
        (err) => {
          console.log(err);
        });

    }
  }
}
