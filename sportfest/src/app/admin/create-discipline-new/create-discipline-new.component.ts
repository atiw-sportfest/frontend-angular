import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DisziplinNEU, VariableNEU } from '../../interfaces';
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

  einheitPool: any[];

  statusCodeText:string;
  statusCodeIcon:string;


  constructor(private sfService: SportfestService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.statusCodeText="False / Not Checked";
    this.statusCodeIcon="error"; //check circle  

    this.einheitPool = [];
    this.einheitPool.push("Zeit-MM:SS");
    this.einheitPool.push("Zeit-SS:MS");
    this.einheitPool.push("Tore");

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

}
