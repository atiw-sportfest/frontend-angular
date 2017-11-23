import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { SportfestService } from './sportfest.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private sfService: SportfestService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Gast:  Home, Sportarten angucken
    // Schiedrichter: Sportarten (Ergebnisse) bearbeiten
    // Admin: Admin, Import
    
    let url = state.url.split('/')[1];
    
    let role = localStorage.getItem("role");
    console.log("ROLE --> ", role);
    
    switch (url) {
      // Gast darf:
      case "home":
      case "einzel":
      case "team":
        return true;
      // Schiedsrichter und Admin darf:
      case "blabla":
        return (role == "schiedsrichter" || role == "admin");
      // Admin darf:
      case "createDiscipline":
      case "createDisciplineNew":
      case "activateDiscipline":
      case "uac":
      case "createSportfest":           
      case "import":
        return (role == "admin");
      default: 
        return false;
    }
  }
}
