import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisziplinNEU, VariableNEU,TypNEU } from '../../interfaces';
import { SportfestService } from '../../sportfest.service';

@Component({
  selector: 'app-create-discipline-new',
  templateUrl: './create-discipline-new.component.html',
  styleUrls: ['./create-discipline-new.component.css']
})
export class CreateDisciplineNewComponent implements OnInit {
  nameDerDisziplin: string;
  beschreibungDerDisziplin: string;
  klassenleistung: boolean;
  anzahlDerVersuchen: number;

  arrayOfVars: VariableNEU[];

  regel: string;

  einheitPool: TypNEU[];

  statusCodeText: string;
  statusCodeIcon: string;

  syntaxCorrect:boolean;

  constructor(private sfService: SportfestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sfService.typenNEU().subscribe(data=>{
      this.einheitPool=data;
    })

    this.statusCodeText = "Fehler / Nicht Überprüft";
    this.statusCodeIcon = "error";
    this.syntaxCorrect=false;

    this.arrayOfVars = [];

    let dis: DisziplinNEU;
    this.nameDerDisziplin = "Käse";
    this.klassenleistung = true;
    this.beschreibungDerDisziplin = "lorem ipsum...";

    
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

    if (this.statusCodeIcon == "error") {
      this.statusCodeText = "Der Code ist syntaktisch richtig";
      this.statusCodeIcon = "done";
      this.syntaxCorrect = true;
    } else {
      this.statusCodeText = "Syntaktischer Fehler im Code";
      this.statusCodeIcon = "error";
      this.syntaxCorrect=false;
    }
  }

  textChanged() {
    this.statusCodeText = "Code nicht Überprüft";
    this.statusCodeIcon = "error";
    this.syntaxCorrect=false;
  }



}
