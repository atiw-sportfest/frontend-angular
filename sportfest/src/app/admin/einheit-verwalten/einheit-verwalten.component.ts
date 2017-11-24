import { Component, OnInit } from '@angular/core';
import { TypNEU } from '../../interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SportfestService } from '../../sportfest.service';

@Component({
  selector: 'app-einheit-verwalten',
  templateUrl: './einheit-verwalten.component.html',
  styleUrls: ['./einheit-verwalten.component.css']
})
export class EinheitVerwaltenComponent implements OnInit {
  einheitPool: TypNEU[];


  constructor(private sfService: SportfestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sfService.typenNEU().subscribe(data => {
      this.einheitPool = data;
    });
    console.log(this.einheitPool);
  }

  deleteEinheit(index: number) {
    this.einheitPool.splice(index, 1);
  }

  addEinheit() {
    let neueEinheit = {
      id: null,
      datentyp: "",
      einheit: "Neue Einheit",
      format: "",
      bsp: ""
    }

    this.einheitPool.push(neueEinheit);
  }

  sendToBackend(){
    //todo schnittstelle einrichten
  }

}
