import { Component, OnInit } from '@angular/core';
import { DisziplinNEU, AnmeldungNEU } from '../interfaces';
import { ActivatedRoute, Router } from "@angular/router";
import { SportfestService } from "../sportfest.service";

@Component({
  selector: 'app-disziplin',
  templateUrl: './disziplin.component.html',
  styleUrls: ['./disziplin.component.css']
})
export class DisziplinComponent implements OnInit {

  disziplin: DisziplinNEU = {};
  anmeldungen: AnmeldungNEU[];
  selectedAnmeldungen: AnmeldungNEU[];
  leistungen: string[][];
  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leistungen = [[]];
      this.selectedAnmeldungen = [{}];
      this.anmeldungen = [];
      this.disziplin = {};
      this.sfService.disziplinNEU(+params['id']).subscribe(data => {
        this.disziplin = data;
        this.sfService.anmeldungenAnDisziplin(this.disziplin.id).subscribe(data => {
          this.anmeldungen = data;
        });
        for (var i = 0; i < this.disziplin.variablen.length; i++)
          this.leistungen[0].push("");
      }); // (+) converts string 'id' to a number
    });
    console.log('AfterView');
  }

  private enoughPermissionsToWrite() {
    let role = localStorage.getItem('role');
    if (role == 'admin' || role == 'schiedsrichter') {
      return true;
    } else {
      return false;
    }
  }

  private speichern() {
    console.log(this.selectedAnmeldungen);
    console.log(this.leistungen);
  }

  private teilnehmerHinzufuegen() {
    this.selectedAnmeldungen.push({});
    this.leistungen.push([]);
    for (var i = 0; i < this.disziplin.variablen.length; i++)
      this.leistungen[this.leistungen.length - 1].push("");
  }

  private anmeldungBereitsGewaehlt(pos: number, anmeldung: AnmeldungNEU): boolean {
    for(var i=0; i<pos;i++){
      if(this.selectedAnmeldungen[i]==anmeldung)
        return false;
    }
    return true;
  }

}
