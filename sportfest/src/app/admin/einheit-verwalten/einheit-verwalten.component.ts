import { Component, OnInit } from '@angular/core';
//import { TypNEU } from '../../interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SportfestService } from '../../sportfest.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Typ } from '../../model/Typ';

@Component({
  selector: 'app-einheit-verwalten',
  templateUrl: './einheit-verwalten.component.html',
  styleUrls: ['./einheit-verwalten.component.css']
})
export class EinheitVerwaltenComponent implements OnInit {
  einheitPool: TypExtended[];
  keys: any[];

  //TODO sfService löschen wenn Typen schnittestelle existiert
  constructor(private sfService: SportfestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.einheitPool = [];
    this.keys = [];

    for (let item in Typ.DatentypEnum) {
      if (item.toString().charAt(0) == item.toString().charAt(0).toLowerCase()) {
        this.keys.push(item);
      }
    }

    // this.sfService.typenNEU().subscribe(data => {
    //   this.einheitPool = data;
    // });

    // this.einheitPool.forEach(einheit => {
    //   einheit.shouldDelete = false;
    // });

  }

  deleteEinheit(index: number) {
    //this.einheitPool.splice(index, 1);
    this.einheitPool[index].shouldDelete = true;
  }

  addEinheit() {

    let neueEinheit = {
      id: null,
      datentyp: Typ.DatentypEnum.String,
      einheit: "Neue Einheit",
      format: "",
      bsp: "",
      shouldDelete: false
    }

    this.einheitPool.push(neueEinheit);
  }

  sendToBackend() {
    this.einheitPool.forEach(einheit => {
      if (einheit.shouldDelete) {
        this.sfService.typenLoeschenNEU(einheit.id);
      } else if (einheit.id) {
        let sendeEinheit = {
          id: einheit.id,
          datentyp: einheit.datentyp,
          einheit: einheit.einheit,
          format: einheit.format,
          bsp: einheit.bsp
        };
        console.log(sendeEinheit);
        //this.sfService.typenAendernNEU(sendeEinheit.id, sendeEinheit);
      } else {
        let sendeEinheit = {
          id: null,
          datentyp: einheit.datentyp,
          einheit: einheit.einheit,
          format: einheit.format,
          bsp: einheit.bsp
        };
        console.log(sendeEinheit);
        //this.sfService.typenHinzufuegenNEU(sendeEinheit);
      }
    });
  }

}

export interface TypExtended extends Typ {
  shouldDelete?: boolean;
}