import { Component, OnInit } from '@angular/core';
import { TypNEU } from '../../interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SportfestService } from '../../sportfest.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-einheit-verwalten',
  templateUrl: './einheit-verwalten.component.html',
  styleUrls: ['./einheit-verwalten.component.css']
})
export class EinheitVerwaltenComponent implements OnInit {
  einheitPool: TypNEUExtended[];


  constructor(private sfService: SportfestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sfService.typenNEU().subscribe(data => {
      this.einheitPool = data;
    });

    this.einheitPool.forEach(einheit => {
      einheit.shouldDelete = false;
    });

    console.log(this.einheitPool);
  }

  deleteEinheit(index: number) {
    //this.einheitPool.splice(index, 1);
    this.einheitPool[index].shouldDelete = true;
  }

  addEinheit() {
    let neueEinheit = {
      id: null,
      datentyp: "",
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
        this.sfService.typenAendernNEU(sendeEinheit.id, sendeEinheit);
      } else {
        let sendeEinheit = {
          id: null,
          datentyp: einheit.datentyp,
          einheit: einheit.einheit,
          format: einheit.format,
          bsp: einheit.bsp
        };
        this.sfService.typenHinzufuegenNEU(sendeEinheit);
      }
    });
  }

}

export interface TypNEUExtended extends TypNEU {
  shouldDelete?: boolean;
}