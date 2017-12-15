import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SportfestService } from '../../sportfest.service';
import { Disziplin, Variable, Script, Typ, DisziplinService as DisziplinApi, MetaService as MetaApi } from 'sportfest-api';

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

  enableButton: boolean;
  reasonButtonDisabled: string;

  syntaxCorrect: boolean;

  constructor(private metaApi: MetaApi, private disziplinApi: DisziplinApi, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.reasonButtonDisabled = "";
    this.enableButton = false;
    this.fehlermeldung = "";
    this.metaApi.typGet().subscribe(data => {
      this.einheitPool = data;

      this.route.params.forEach((params: Params) => {
        this.idDerDisziplin = params['id'];
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
    this.updateEnableButton();
  }

  addVar() {
    let dummyVar = { bezeichnung: "", typNEU: {} }
    this.arrayOfVars.push(dummyVar);
    this.updateEnableButton();
  }

  checkCode() {

    this.statusCodeText = "Code wird überprüft";
    var script: Script = { script: this.regel };
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
      this.updateEnableButton();
    });

  }

  textChanged() {
    this.statusCodeText = "Code nicht Überprüft";
    this.statusCodeIcon = "error";
    this.syntaxCorrect = false;
    this.updateEnableButton();
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

  updateEnableButton() {
    this.enableButton = false;
    if (this.nameDerDisziplin == "") {
      this.reasonButtonDisabled = "Name der Disziplin fehlt";
      return false;
    }
    if (this.beschreibungDerDisziplin == "") {
      this.reasonButtonDisabled = "Beschreibung der Disziplin fehlt";
      return false;
    }
    if (this.arrayOfVars.length == 0) {
      this.reasonButtonDisabled = "Es muss mindestens eine Variable geben";
      return false;
    }

    for (let i = 0; i < this.arrayOfVars.length; i++) {
      if (this.arrayOfVars[i].bezeichnung == "") {
        this.reasonButtonDisabled = "Die Variable an der Stelle " + (i + 1) + " hat keine Bezeichung";
        return false;
      }
    }

    for (let i = 0; i < this.arrayOfVars.length; i++) {
      if (!this.arrayOfVars[i].typ) {
        this.reasonButtonDisabled = "Die Variable an der Stelle " + (i + 1) + " hat keine Einheit";
        return false;
      }
    }

    if (!this.syntaxCorrect) {
      this.reasonButtonDisabled = "Synax der Regel ist nicht korrekt";
      return false;
    }
    this.enableButton = true;

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

    console.log(disziplinDTO);

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
          this.router.navigate(["/activateDiscipline"]);
        },
        (err) => {
          console.log(err);
        });

    }
  }
}
