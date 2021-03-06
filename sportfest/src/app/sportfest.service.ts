import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DisziplinNEU, TypNEU, ErgebnisNEU, AnmeldungNEU, LeistungNEU } from './interfaces';
import { TechnischerService } from './technischer.service';
import 'rxjs/add/observable/of';
import _ from "lodash";

@Injectable()
export class SportfestService {

  private disziplinenVAR: DisziplinNEU[];
  private typen: TypNEU[];
  private ergebnisseVAR: ErgebnisNEU[];
  private anmeldungen: AnmeldungNEU[];
  private codeCorrect: boolean;
  constructor(private techService: TechnischerService) {
    this.codeCorrect = false;

    this.disziplinenVAR = [
      {
        id: 1,
        bezeichnung: "Staffel",
        beschreibung: "4 Leute einer Klasse laufen um die Wette (Klassenleistung, Gruppen)",
        klassenleistung: true,
        versus: true,
        aktiviert: true,
        regel: {
          id: 1,
          script: "Hier wird etwas schnelles passieren"
        },
        variablen: [{
          id: 1,
          bezeichnung: "Laufzeit",
          typ: {
            id: 1,
            datentyp: "String",
            einheit: "Zeit",
            format: "\\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        id: 2,
        bezeichnung: "Kistenstapeln",
        beschreibung: "Wer kommt höher? Die FS151 oder die anderen Luschen? (Klassenleistung, Jeder gegen Jeden)",
        klassenleistung: true,
        versus: false,
        aktiviert: true,
        regel: {
          id: 2,
          script: "Hier wird etwas hohes passieren"
        },
        variablen: [{
          id: 2,
          bezeichnung: "Anzahl Kisten",
          typ: {
            id: 2,
            datentyp: "Integer",
            einheit: "Anzahl",
            format: "\\d*",
            bsp: "5"
          }
        },
        {
          id: 3,
          bezeichnung: "Zeit",
          typ: {
            id: 1,
            datentyp: "String",
            einheit: "Zeit",
            format: "\\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        id: 3,
        bezeichnung: "Weitsprung ",
        beschreibung: "Spring los Kartoffelbrei! (Einzelleistung, Jeder gegen Jeden)",
        aktiviert: true,
        versus: false,
        klassenleistung: false,
        regel: {
          id: 3,
          script: "Hier wird etwas weites passieren"
        },
        variablen: [{
          id: 4,
          bezeichnung: "Sprung 1",
          typ: {
            id: 3,
            datentyp: "double",
            einheit: "Meter",
            format: "\\d*,\\d*",
            bsp: "2,89"
          }
        },
        {
          id: 5,
          bezeichnung: "Sprung 2",
          typ: {
            id: 3,
            datentyp: "double",
            einheit: "Meter",
            format: "\\d*,\\d*",
            bsp: "2,89"
          }
        },
        {
          id: 6,
          bezeichnung: "Sprung 3",
          typ: {
            id: 3,
            datentyp: "double",
            einheit: "Meter",
            format: "\\d*,\\d*",
            bsp: "2,89"
          }
        }]
      },
      {
        id: 4,
        bezeichnung: "2000M Lauf",
        beschreibung: "Lauf Forrest Laaaaaaaaaauf (Einzelleistung, Gruppen)",
        aktiviert: true,
        klassenleistung: false,
        versus: true,
        regel: {
          id: 4,
          script: "Hier wird etwas schnelles weites passieren"
        },
        variablen: [{
          id: 7,
          bezeichnung: "Laufzeit",
          typ: {
            id: 1,
            datentyp: "String",
            einheit: "Zeit",
            format: "\\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        id: 5,
        bezeichnung: "Beach - Volleyball",
        beschreibung: "Panieren und Punkten!\n\nGegen Teams aus zwei anderen Klassen wird jeweils 12 Minuten gespielt.\nJe nach Zeit laufen die 2. Spiele bis 21 Punkte.(bei 21 : 20 ist Schluss !) \n\nAchtung :\nDer Ball darf nur geradeaus über das Netz gepritscht werden !\nSpiel mit offener Hand ( Lob ) ist  nicht erlaubt ! ",
        aktiviert: true,
        klassenleistung: true,
        versus: true,
        regel: {
          id: 5,
          script: "direkt {\nsort 'punkte';\npunkte 15,8;\n}"
        },
        variablen: [{
          id: 8,
          bezeichnung: "Anzahl",
          typ: {
            id: 2,
        datentyp: "Integer",
        einheit: "Anzahl",
        format: "\\d*",
        bsp: "5"
          }
        }]
      }
    ];
    this.typen = [
      {
        id: 1,
        datentyp: "String",
        einheit: "Zeit",
        format: "\\d*:[0-5][0-9]",
        bsp: "3:20"
      },
      {
        id: 2,
        datentyp: "Integer",
        einheit: "Anzahl",
        format: "\\d*",
        bsp: "5"
      },
      {
        id: 3,
        datentyp: "double",
        einheit: "Meter",
        format: "\\d*,\\d*",
        bsp: "2,89"
      }
    ];
    this.ergebnisseVAR = [
      {
        id: 1,
        leistungen: [
          {
            id: 1,
            wert: "10:23",
            variable: {
              id: 1,
              bezeichnung: "Laufzeit",
              typ: {
                id: 1,
                datentyp: "String",
                einheit: "Zeit",
                format: "\\d*:[0-5][0-9]",
                bsp: "3:20"
              }
            }
          }
        ],
        versus: 9,
        klasse: {
          id: 1234,
          bezeichnung: "FS151"
        },
        schueler: {
          sid: 3041,
          vorname: "Trulla",
          name: "Tröt",
          klasse: {
            id: 1234,
            bezeichnung: "FS151"
          },
          gid: 2
        },
        disziplin: {
          id: 1,
          bezeichnung: "Staffel",
          beschreibung: "4 Leute einer Klasse laufen um die Wette (Klassenleistung, Gruppen)",
          versus: true,
          aktiviert: true,
          regel: {
            id: 1,
            script: "Hier wird etwas schnelles passieren"
          },
          variablen: [{
            id: 1,
            bezeichnung: "Laufzeit",
            typ: {
              id: 1,
              datentyp: "String",
              einheit: "Zeit",
              format: "\\d*:[0-5][0-9]",
              bsp: "3:20"
            }
          }]
        },
        punkte: 10
      },
      {
        id: 2,
        leistungen: [
          {
            id: 2,
            wert: "120",
            variable: {
              id: 1,
              bezeichnung: "Laufzeit",
              typ: {
                id: 1,
                datentyp: "String",
                einheit: "Zeit",
                format: "\\d*:[0-5][0-9]",
                bsp: "3:20"
              }
            }
          }
        ],
        versus: 9,
        klasse: {
          id: 1234,
          bezeichnung: "FS151"
        },
        schueler: {
          sid: 3400,
          vorname: "Bernd",
          name: "Vogel",
          klasse: {
            id: 1234,
            bezeichnung: "FS151"
          },
          gid: 1
        },
        disziplin: {
          id: 1,
          bezeichnung: "Staffel",
          beschreibung: "4 Leute einer Klasse laufen um die Wette (Klassenleistung, Gruppen)",
          versus: true,
          aktiviert: true,
          regel: {
            id: 1,
            script: "Hier wird etwas schnelles passieren"
          },
          variablen: [{
            id: 1,
            bezeichnung: "Laufzeit",
            typ: {
              id: 1,
              datentyp: "String",
              einheit: "Zeit",
              format: "\\d*:[0-5][0-9]",
              bsp: "3:20"
            }
          }]
        },
        punkte: 6
      }
    ]
    this.anmeldungen = [
      {
        id: 1,
        schueler: {
          sid: 3041,
          vorname: "Trulla",
          name: "Tröt",
          klasse: {
            id: 1234,
            bezeichnung: "FS151"
          },
          gid: 2
        },
        disziplin: 1
      },
      {
        id: 2,
        schueler: {
          sid: 3400,
          vorname: "Bernd",
          name: "Vogel",
          klasse: {
            id: 1234,
            bezeichnung: "FS151"
          },
          gid: 1
        },
        disziplin: 2
      },
      {
        id: 3,
        schueler: {
          sid: 3400,
          vorname: "Bernd",
          name: "Vogel",
          klasse: {
            id: 1235,
            bezeichnung: "FI123"
          },
          gid: 1
        },
        disziplin: 1
      },
      {
        id: 3,
        schueler: {
          sid: 3400,
          vorname: "Bernd",
          name: "Vogel",
          klasse: {
            id: 1234,
            bezeichnung: "FS151"
          },
          gid: 1
        },
        disziplin: 3
      },
      {
        id: 4,
        schueler: {
          sid: 3403,
          vorname: "Max",
          name: "Mustermann",
          klasse: {
            id: 1235,
            bezeichnung: "FI152"
          },
          gid: 1
        },
        disziplin: 3
      }
    ]
  }


/**
 * Neue Dinge
 */

public sporfestBeenden(): Observable<any>{
  //return this.techService.putRequest();
  return Observable.of(true);
}


  /**
   * ***********************************************
   * Test Resource
   * ***********************************************
   */

  /**
   * Test GET
   */
  public test(): Observable<any> {
    return this.techService.getRequest('/test');
  }
  public testpost(data: any): Observable<any> {
    return this.techService.postRequest('/data', data);
  }

  /**
   * ***********************************************
   * User Resource
   * ***********************************************
   */

  /**
   * Anmeldung
   */
  public userLogin(username: string, password: any): Observable<any> {
    return this.techService.postFormRequest('/authentication', encodeURI('username=' + username + '&password=' + password));
  }
  /**
   * Gibt die User Privilegien zurück
   */
  public userPrivileges(): Observable<any> {
    return this.techService.getRequest('/user/privileges/');
  }
  /**
   * Gibt alle User zurück
   */
  public user(): Observable<any> {
    return this.techService.getRequest('/user');
  }
  /**
   * Fügt einen User hinzu
   */
  public userHinzufuegen(username: string, password: string, userrole: string): Observable<any> {
    return this.techService.postFormRequest('/user/setpw', encodeURI('name=' + username + '&password=' + password + '&role=' + userrole));
  }
  /**
   * Löscht den User
   */
  public userLoeschen(username: string): Observable<any> {
    return this.techService.deleteRequest('/user/' + username);
  }


  /**
   * ***********************************************
   * Schüler Resource
   * ***********************************************
   */

  /**
   * Fügt einen Schüler hinzu
   */
  public schueler(schueler: any): Observable<any> {
    return this.techService.putRequest('/schueler', schueler);
  }
  /**
   * Lädt den Anmeldebogen einer Klasse runter
   */
  public schuelerAnmeldebogen(classId: number): Observable<any> {
    return this.techService.getRequest('/klasse/' + classId + '/anmeldung');
  }

  public schuelerPerDisziplin(classId: number, disziplinId: number): Observable<any> {
    return this.techService.getRequest('/schueler/' + classId + '/' + disziplinId);
  }

  public schuelerMitLeistungEinerDisziplin(did: number): Observable<any> {
    return this.techService.getRequest('/schueler/leistung/disziplin/' + did);
  }
  /**
   * ***********************************************
   * Disziplin Resource
   * ***********************************************
   */

  /**
   * Gibt alle Disziplinen zurück
   */
  public disziplinen(): Observable<any> {
    return this.techService.getRequest('/disziplin');
  }

  public disziplinenNEU(): Observable<any> {
    return Observable.of(_.cloneDeep(this.disziplinenVAR));
    //return this.techService.getRequest('/disziplin');
  }

  /**
   * Gibt die angefragte Disziplin zurück
   */
  public disziplin(did: number): Observable<any> {
    return this.techService.getRequest('/disziplin/' + did);
  }
  public disziplinNEU(id: number): Observable<any> {
    for (let disziplin of this.disziplinenVAR) {
      if (disziplin.id == id)
        return Observable.of(_.cloneDeep(disziplin));
    }
    return Observable.of([]);
    //return this.techService.getRequest('/disziplin/' + did);
  }
  /**
   * Ändert eine Disziplin
   */
  public disziplinAendern(did: number, disziplin: any): Observable<any> {
    return this.techService.postRequest('/disziplin/' + did, disziplin);
  }
  public disziplinAendernNEU(disziplin: DisziplinNEU): Observable<any> {
    for (var i = 0; i < this.disziplinenVAR.length; i++)
      if (this.disziplinenVAR[i].id == disziplin.id)
        this.disziplinenVAR[i] = disziplin
    return Observable.of(_.cloneDeep(this.disziplinenVAR));
    //return this.techService.postRequest('/disziplin/' + id, disziplin);
  }
  /**
   * Schreibt eine Disziplin
   */
  public disziplinSchreiben(disziplin: any): Observable<any> {
    return this.techService.putRequest('/disziplin/', disziplin);
  }
  public disziplinHinzufuegenNEU(disziplin: DisziplinNEU): Observable<any> {
    this.disziplinenVAR.push(disziplin);
    //return this.techService.putRequest('/disziplin/', disziplin);
    return Observable.of(_.cloneDeep(this.disziplinenVAR));
  }
  /**
   * Löscht eine Disziplin
   */
  public deleteDisziplin(did: any): Observable<any> {
    return this.techService.deleteRequest('/disziplin/' + did);
  }
  public disziplinLoeschen(id: number): Observable<any> {
    let pos = -1;
    for (var i = 0; i < this.disziplinenVAR.length; i++)
      if (this.disziplinenVAR[i].id == id)
        pos = i;
    if (pos > -1) {
      this.disziplinenVAR.splice(pos, 1);
    }
    return Observable.of(_.cloneDeep(this.disziplinenVAR));
    //return this.techService.deleteRequest('/disziplin/' + id);
  }

  public scriptPruefen(script: string): Observable<any> {
    this.codeCorrect = !this.codeCorrect;

    return Observable.of(this.codeCorrect);
    //return this.techService.putRequest(???);
  }


  /**
   * ***********************************************
   * Ergebnis Resource
   * ***********************************************
   */

  /**
   * Schreibt ein Ergebnis
   */
  public leistungSchreiben(leistung: any): Observable<any> {
    return this.techService.putRequest('/leistung', leistung);
  }
  public leistungenSchreiben(leistungen: any): Observable<any> {
    return this.techService.putRequest('/leistung/versus', leistungen);
  }
  public leistungenEinerDisziplin(did: number): Observable<any> {
    return this.techService.getRequest('/leistung/disziplin/' + did);
  }

  //Veraltet
  /**
   * Gibt die Ergebnisse zur Disziplin mit der übergebenen ID zuück
   */
  public ergebnisseDisziplin(did: number): Observable<any> {
    return this.techService.getRequest('/ergebnis/' + did);
  }
  /**
   * Ändert ein Ergebnis
   */
  public ergebnisseAendern(did: number, eid: number): Observable<any> {
    return this.techService.getRequest('/ergebnis' + did + '/' + eid);
  }

  /**
   * Löscht ein Ergebnis
   */
  public ergebnisLoeschen(did: number, eid: number): Observable<any> {
    return this.techService.deleteRequest('/ergebnis/' + did + '/' + eid);
  }

  /**
   * ***********************************************
   * Klassen Resource
   * ***********************************************
   */

  /**
   * Gibt Informationen zu allen Klassen
   */
  public klassen(): Observable<any> {
    return this.techService.getRequest('/klasse');
  }
  /**
   * Gibt Informationen zu einer KlassenID
   */
  public klasseID(id: number): Observable<any> {
    return this.techService.getRequest('/klasse/' + id);
  }
  /**
   * Schreibt eine Klasse
   */
  public klasseSchreiben(klasse: any): Observable<any> {
    return this.techService.putRequest('/klasse', klasse);
  }
  /**
   * Gib Klasse mit Anmeldung an Disziplin
   */
  public klasseMitAnmeldung(did: number): Observable<any> {
    return this.techService.getRequest('/klasse/anmeldung/' + did);
  }
  /**
   * Gib Klasse mit Leistung an Disziplin
   */
  public klassenMitLeistung(did: number): Observable<any> {
    return this.techService.getRequest('/klasse/leistungen/' + did);
  }
  /**
   * Ändert das Passwort
   */
  public changePassword(oldPassword: any, newPassword: any): Observable<any> {
    return this.techService.postFormRequest('/user/password', encodeURI('currpw=' + oldPassword + '&newpw=' + newPassword));
  }
  /**
   * Gibt Informationen zu allen Datentypen (für Regelvariablen)
   */
  public datentypenHolen(): Observable<any> {
    return this.techService.getRequest('/typ');
  }
  public typenNEU(): Observable<any> {
    return Observable.of(_.cloneDeep(this.typen));
  }

  public typenAendernNEU(id: number, typ: TypNEU): Observable<any> {
    for (var i = 0; i < this.typen.length; i++)
      if (this.typen[i].id == id)
        this.typen[i] = typ;
    return Observable.of(_.cloneDeep(this.typen));
  }

  public typenLoeschenNEU(id: number): Observable<any> {
    let pos = -1;
    for (var i = 0; i < this.typen.length; i++)
      if (this.typen[i].id == id)
        pos = i;
    if (pos > -1) {
      this.ergebnisseVAR.splice(pos, 1);
    }
    return Observable.of(_.cloneDeep(this.typen));
  }

  public typenHinzufuegenNEU(typ: TypNEU): Observable<any> {
    this.typen.push(typ);
    return Observable.of(_.cloneDeep(this.typen));
  }

  public ergebnisHinzufuegenNEU(ergebnisse: ErgebnisNEU[]) {
    for(let ergebnis of ergebnisse)
      this.ergebnisseVAR.push(ergebnis);
  }

  public ergebnisseNEU(): Observable<ErgebnisNEU[]> {
    return Observable.of(_.cloneDeep(this.ergebnisseVAR));
  }
  public ergebnisNEU(id: number): Observable<ErgebnisNEU> {
    for (let ergebnis of this.ergebnisseVAR)
      if (ergebnis.id == id)
        return Observable.of(_.cloneDeep(ergebnis));
  }
  public ergebnisAendernNEU(ergebnis: ErgebnisNEU): Observable<ErgebnisNEU[]> {
    for (var i = 0; i < this.ergebnisseVAR.length; i++)
      if (this.ergebnisseVAR[i].id == ergebnis.id)
        this.ergebnisseVAR[i] = ergebnis;
    return Observable.of(_.cloneDeep(this.ergebnisseVAR));
  }

  public ergebnisLoeschenNeu(id: number): Observable<ErgebnisNEU[]> {
    let pos = -1;
    for (var i = 0; i < this.ergebnisseVAR.length; i++)
      if (this.ergebnisseVAR[i].id == id)
        pos = i;
    if (pos > -1) {
      this.ergebnisseVAR.splice(pos, 1);
    }
    return Observable.of(_.cloneDeep(this.ergebnisseVAR));
  }

  public ergebnissVonDisziplinUndKlasseUndOptionalerSchueler(disziplin: DisziplinNEU, kid: number, sid?: number): Observable<ErgebnisNEU> {
    if(disziplin.klassenleistung){
      
    }else{
      
    }
    for (let ergebnis of this.ergebnisseVAR)
      if (ergebnis.disziplin.id == disziplin.id
        && ergebnis.klasse.id == kid
        && (!sid || ergebnis.schueler.sid == sid))
        return Observable.of(_.cloneDeep(ergebnis));
    return Observable.of(undefined);
  }

  public ergebnisseVonDisziplin(did: number): Observable<ErgebnisNEU[]> {
    return Observable.of(_.cloneDeep(this.ergebnisseVAR));
  }

  public anmeldungenAnDisziplin(id: number): Observable<AnmeldungNEU[]> {
    let tmp: AnmeldungNEU[] = [];
    for (let anmeldung of this.anmeldungen)
      if (anmeldung.disziplin == id)
        tmp.push(anmeldung);

    return Observable.of(_.cloneDeep(tmp));
  }

  public leistungHinzufügen(leistung: LeistungNEU, did: number, sid: number): Observable<LeistungNEU[]> {
    this.ergebnisseVAR[0].leistungen.push(leistung);
    return Observable.of(_.cloneDeep(this.ergebnisseVAR[0].leistungen));
  }

  public leistungVonDisziplinUndKlasseUndOptionalerSchueler(disziplin: DisziplinNEU, kid: number, sid?: number): Observable<LeistungNEU[]> {
    if(disziplin.klassenleistung){

    }else{

    }
    return Observable.of(_.cloneDeep(this.ergebnisseVAR[0].leistungen));
  }
}
