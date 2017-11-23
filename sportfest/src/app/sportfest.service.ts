import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DisziplinNEU } from './interfaces';
import { TechnischerService } from './technischer.service';

@Injectable()
export class SportfestService {

  private disziplinenVAR: DisziplinNEU[];

  constructor(private techService: TechnischerService) {
    this.disziplinenVAR = [
      {
        did: 1,
        name: "Staffel",
        beschreibung: "4 Leute einer Klasse laufen um die Wette (Klassenleistung, Gruppen)",
        regel: {
          index: 1,
          script: "Hier wird etwas schnelles passieren"
        },
        variablen: [{
          bezeichnung: "Laufzeit",
          typ: {
            datentyp: "String",
            einheit: "Zeit",
            format: "\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        did: 2,
        name: "Kistenstapeln",
        beschreibung: "Wer kommt höher? Die FS151 oder die anderen Luschen? (Klassenleistung, Jeder gegen Jeden)",
        regel: {
          index: 2,
          script: "Hier wird etwas hohes passieren"
        },
        variablen: [{
          bezeichnung: "Anzahl Kisten",
          typ: {
            datentyp: "Integer",
            einheit: "Anzahl",
            format: "\d*",
            bsp: "5"
          }
        },
        {
          bezeichnung: "Zeit",
          typ: {
            datentyp: "String",
            einheit: "Zeit",
            format: "\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
      },
      {
        did: 3,
        name: "Weitsprung ",
        beschreibung: "Spring los Kartoffelbrei! (Einzelleistung, Jeder gegen Jeden)",
        regel: {
          index: 3,
          script: "Hier wird etwas weites passieren"
        },
        variablen: [{
          bezeichnung: "Sprung 1",
          typ: {
            datentyp: "double",
            einheit: "Meter",
            format: "\d*,\d*",
            bsp: "2,89"
          }
        },
        {
          bezeichnung: "Sprung 2",
          typ: {
            datentyp: "double",
            einheit: "Meter",
            format: "\d*,\d*",
            bsp: "2,89"
          }
        },
        {
          bezeichnung: "Sprung 3",
          typ: {
            datentyp: "double",
            einheit: "Meter",
            format: "\d*,\d*",
            bsp: "2,89"
          }
        }]
      },
      {
        did: 4,
        name: "2000M Lauf",
        beschreibung: "Lauf Forrest Laaaaaaaaaauf (Einzelleistung, Gruppen)",
        regel: {
          index: 4,
          script: "Hier wird etwas schnelles weites passieren"
        },
        variablen: [{
          bezeichnung: "Laufzeit",
          typ: {
            datentyp: "String",
            einheit: "Zeit",
            format: "\d*:[0-5][0-9]",
            bsp: "3:20"
          }
        }]
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
  /**
   * Gibt die angefragte Disziplin zurück
   */
  public disziplin(did: number): Observable<any> {
    return this.techService.getRequest('/disziplin/' + did);
  }
  /**
   * Ändert eine Disziplin
   */
  public disziplinAendern(did: number, disziplin: any): Observable<any> {
    return this.techService.postRequest('/disziplin/' + did, disziplin);
  }
  /**
   * Schreibt eine Disziplin
   */
  public disziplinSchreiben(disziplin: any): Observable<any> {
    return this.techService.putRequest('/disziplin/', disziplin);
  }
  /**
   * Löscht eine Disziplin
   */
  public deleteDisziplin(did: any): Observable<any> {
    return this.techService.deleteRequest('/disziplin/' + did);
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
}
