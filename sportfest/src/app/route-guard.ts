import { SportfestService } from './sportfest.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(private sfService: SportfestService) {}

  canActivate() {
      // TODO!
    return true;
  }
}
