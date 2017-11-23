import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DisziplinNEU, TypNEU } from './interfaces';
import { TechnischerService } from './technischer.service';

@Injectable()
export class SportfestService {

  private disziplinenVAR: DisziplinNEU[];
  private typen: TypNEU[];

  constructor(private techService: TechnischerService) {
    this.disziplinenVAR = [
      {
        id: 1,
        name: "Staffel",
        beschreibung: "4 Leute einer Klasse laufen um die Wette (Klassenleistung, Gruppen)",
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
            format: "\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        id: 2,
        name: "Kistenstapeln",
        beschreibung: "Wer kommt höher? Die FS151 oder die anderen Luschen? (Klassenleistung, Jeder gegen Jeden)",
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
            format: "\d*",
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
            format: "\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        id: 3,
        name: "Weitsprung ",
        beschreibung: "Spring los Kartoffelbrei! (Einzelleistung, Jeder gegen Jeden)",
        aktiviert: true,
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
            format: "\d*,\d*",
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
            format: "\d*,\d*",
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
            format: "\d*,\d*",
            bsp: "2,89"
          }
        }]
      },
      {
        id: 4,
        name: "2000M Lauf",
        beschreibung: "Lauf Forrest Laaaaaaaaaauf (Einzelleistung, Gruppen)",
        aktiviert: true,
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
            format: "\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      }
    ];
    this.typen = [
      {
        id: 1,
        datentyp: "String",
        einheit: "Zeit",
        format: "\d*:[0-5][0-9]",
        bsp: "3:20"
      },
      {
        id: 2,
        datentyp: "Integer",
        einheit: "Anzahl",
        format: "\d*",
        bsp: "5"
      },
      {
        id: 3,
        datentyp: "double",
        einheit: "Meter",
        format: "\d*,\d*",
        bsp: "2,89"
      }
    ];
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

  public schuelerPerDisziplin(classId: number, disziplinId: number) {
    return this.techService.getRequest('/schueler/' + classId + '/' + disziplinId);
  }

  public schuelerMitLeistungEinerDisziplin(did: number) {
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
    return Observable.of(this.disziplinenVAR);
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
        return Observable.of(disziplin);
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
    return Observable.of(this.disziplinenVAR);
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
    return Observable.of(this.disziplinenVAR);
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
    return Observable.of(this.disziplinenVAR);
    //return this.techService.deleteRequest('/disziplin/' + id);
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
    return Observable.of(this.typen);
  }
}
