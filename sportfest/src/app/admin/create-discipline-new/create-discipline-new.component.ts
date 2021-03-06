import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisziplinNEU, VariableNEU, TypNEU, RegelNEU } from '../../interfaces';
import { SportfestService } from '../../sportfest.service';

@Component({
  selector: 'app-create-discipline-new',
  templateUrl: './create-discipline-new.component.html',
  styleUrls: ['./create-discipline-new.component.css']
})
export class CreateDisciplineNewComponent implements OnInit {
  idDerDisziplin: number;
  nameDerDisziplin: string;
  beschreibungDerDisziplin: string;
  klassenleistung: boolean;
  anzahlDerVersuchen: number;
  versus: boolean;

  arrayOfVars: VariableNEU[];

  regelString: string;
  regel: RegelNEU;

  einheitPool: TypNEU[];
  selectedEinheit: TypNEU;
  statusCodeText: string;
  statusCodeIcon: string;

  syntaxCorrect: boolean;

  constructor(private sfService: SportfestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sfService.typenNEU().subscribe(data => {
      this.einheitPool = data;

      this.route.params.forEach((params: Params) => {
        this.idDerDisziplin = +params['id'];
        if (this.idDerDisziplin) {
          this.sfService.disziplinNEU(this.idDerDisziplin).subscribe((data: DisziplinNEU) => {
            this.nameDerDisziplin = data.bezeichnung;
            this.beschreibungDerDisziplin = data.beschreibung;
            this.klassenleistung = data.klassenleistung;
            this.regel = data.regel;
            this.assignVars(data.variablen);
            this.versus = data.versus;

            this.statusCodeText = "Der Code ist Syntaktisch richtig";
            this.statusCodeIcon = "done";
            this.syntaxCorrect = true;
          });
        } else {
          this.regel = { id: null, script: "" };
          this.idDerDisziplin = null;
          this.nameDerDisziplin = "";
          this.beschreibungDerDisziplin = "";
          this.klassenleistung = false;
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
    console.log("Mit Compiler verbinden!");

    this.statusCodeText = "Code wird überprüft";
    this.sfService.scriptPruefen(this.regelString).subscribe(data => {
      this.syntaxCorrect = data;

    });

    if (this.syntaxCorrect) {
      this.statusCodeText = "Der Code ist Syntaktisch richtig";
      this.statusCodeIcon = "done";
    } else {
      this.statusCodeText = "Syntaktischer Fehler im Code";
      this.statusCodeIcon = "error";
    }

  }

  textChanged() {
    this.statusCodeText = "Code nicht Überprüft";
    this.statusCodeIcon = "error";
    this.syntaxCorrect = false;
  }

  assignVars(vars: VariableNEU[]) {
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
    let disziplinDTO: DisziplinNEU;
    disziplinDTO = {
      id: this.idDerDisziplin,
      bezeichnung: this.nameDerDisziplin,
      beschreibung: this.beschreibungDerDisziplin,
      aktiviert: true,
      regel: this.regel,
      klassenleistung: this.klassenleistung,
      variablen: this.arrayOfVars,
      versus: this.versus
    }

    if (disziplinDTO.id) { //Disziplin existiert schon
      this.sfService.disziplinAendernNEU(disziplinDTO).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        });
    } else { //Neue Disziplin
      this.sfService.disziplinHinzufuegenNEU(disziplinDTO).subscribe(
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
