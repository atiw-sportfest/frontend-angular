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
  disziplin: DisziplinNEU;
  anmeldungen: AnmeldungNEU[];
  selectedAnmeldung: AnmeldungNEU;
  constructor(private route: ActivatedRoute, private sfService: SportfestService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sfService.disziplinNEU(+params['id']).subscribe(data => {
        this.disziplin = data;
        this.sfService.anmeldungenAnDisziplin(this.disziplin.id).subscribe(data=>{
          this.anmeldungen = data;
        });
      }); // (+) converts string 'id' to a number
    });
  }

  private enoughPermissionsToWrite() {
    let role = localStorage.getItem('role');
    if (role == 'admin' || role == 'schiedsrichter'){
      return true;
    } else {
      return false;
    }
  }

}
