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
    })
    this.route.params.forEach((params: Params) => {
      this.idDerDisziplin = +params['id'];
    });
    if (this.idDerDisziplin) {
      this.sfService.disziplinNEU(this.idDerDisziplin).subscribe((data: DisziplinNEU) => {
        this.nameDerDisziplin = data.name;
        this.beschreibungDerDisziplin = data.beschreibung;
        this.klassenleistung = data.klassenleistung;
        this.regel = data.regel;
        this.arrayOfVars = data.variablen;

        console.log("Name: " + this.nameDerDisziplin);
      });
    } else {
      this.regel = { id: null, script: "" };
      this.idDerDisziplin = null;
      this.nameDerDisziplin = "";
      this.beschreibungDerDisziplin = "";
      this.klassenleistung = false;
      this.arrayOfVars = [];

      this.statusCodeText = "Code nicht Überprüft";
      this.statusCodeIcon = "error";
      this.syntaxCorrect = false;


    }
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

    // if (CODECORRECT(this.regel)) {
    //   this.statusCodeText = "Der Code ist Syntaktisch richtig";
    //   this.statusCodeIcon = "check circle";
    // } else {
    //   this.statusCodeText = "Fehler / Nicht Überprüft";
    //   this.statusCodeIcon = "error";
    // }

    //DEBUG-Code
    if (this.statusCodeIcon == "error") {
      this.statusCodeText = "Der Code ist syntaktisch richtig";
      this.statusCodeIcon = "done";
      this.syntaxCorrect = true;
    } else {
      this.statusCodeText = "Syntaktischer Fehler im Code";
      this.statusCodeIcon = "error";
      this.syntaxCorrect = false;
    }
  }

  textChanged() {
    this.statusCodeText = "Code nicht Überprüft";
    this.statusCodeIcon = "error";
    this.syntaxCorrect = false;
  }

  sendToBackend() {
    let disziplinDTO: DisziplinNEU;
    disziplinDTO = {
      id: this.idDerDisziplin,
      name: this.nameDerDisziplin,
      beschreibung: this.beschreibungDerDisziplin,
      aktiviert: true,
      regel: this.regel,
      klassenleistung: this.klassenleistung,
      variablen: this.arrayOfVars,
    }

    console.log("disziplinDTO", disziplinDTO);


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
