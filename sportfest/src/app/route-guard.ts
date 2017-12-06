import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Gast:  Home, Sportarten angucken
    // Schiedrichter: Sportarten (Ergebnisse) bearbeiten
    // Admin: Admin, Import
    
    let url = state.url.split('/')[1];
    
    let role = sessionStorage.getItem("role");
    console.log("ROLE --> ", role);
    
    switch (url) {
      // Gast darf:
      case "home":
      case "disziplin":
        return true;
      // Schiedsrichter und Admin darf:
      case "blabla":
        return (role == "schiedsrichter" || role == "admin");
      // Admin darf:
      case "createDisciplineNew":
      case "activateDiscipline":
      case "uac":
      case "einheitVerwalten":
      case "createSportfest":           
      case "import":
        return (role == "admin");
      default: 
        return false;
    }
  }
}
