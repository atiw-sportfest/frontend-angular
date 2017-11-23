import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Md5 } from 'ts-md5/dist/md5';
import { RouteGuard } from './route-guard';
import { LoginComponent } from './main/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { Location } from '@angular/common';

import { AppComponent } from './app.component';
import { EinzelComponent } from './einzel/einzel.component';
import { TeamComponent } from './team/team.component';
import { SportfestService } from './sportfest.service';
import { TechnischerService } from './technischer.service';
import { HeaderComponent } from './main/desktop/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateDisciplineComponent } from './admin/create-discipline/create-discipline.component';
import { KlassenImportComponent } from './admin/klassen-import/klassen-import.component';
import { ActivateDisciplineComponent } from './admin/activate-discipline/activate-discipline.component';
import { UserAccountControlComponent } from './admin/user-account-control/user-account-control.component';
import { PasswordChangeComponent } from './main/password-change/password-change.component';
import { FooterComponent } from './main/desktop/footer/footer.component';
import { CreateSportfestComponent } from './admin/create-sportfest/create-sportfest.component';
import { AreYouSureComponent } from './main/are-you-sure/are-you-sure.component';
import { MobileHeaderComponent } from './main/mobile/mobile-header/mobile-header.component';
import { MobileMenuListComponent } from './main/mobile/mobile-menu-list/mobile-menu-list.component';
import { MobileHeaderImageComponent } from './main/mobile/mobile-header-image/mobile-header-image.component';

const routConfig: Routes = [
    {
      path: '',
      component: DashboardComponent
    },
    {
      path: 'home',
      component: DashboardComponent
    },
    {
      path: 'createDiscipline',
      component: CreateDisciplineComponent,
      canActivate: [RouteGuard]
    },
    {
      path: 'createDiscipline/:did',
      component: CreateDisciplineComponent,
      canActivate: [RouteGuard]
    },
    {
      path: 'einzel/:did/:name',
      component: EinzelComponent,
      canActivate: [RouteGuard]
    },
    { 
      path: 'team/:did/:name',
      component: TeamComponent,
      canActivate: [RouteGuard]
    },
    { 
      path: 'import',
      component: KlassenImportComponent,
      canActivate: [RouteGuard]
    },
    { 
      path: 'activateDiscipline',
      component: ActivateDisciplineComponent,
      canActivate: [RouteGuard]
    },
    { 
      path: 'uac',
      component: UserAccountControlComponent,
      canActivate: [RouteGuard]
    },
    { 
      path: 'createSportfest',
      component: CreateSportfestComponent,
      canActivate: [RouteGuard]
    }
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

export const BASEPATH = 'http://' + location.host + '/backend'; 
// export const BASEPATH = 'http://localhost:8080/backend'; 

@NgModule({
  declarations: [
    AppComponent,
    EinzelComponent,
    TeamComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    CreateDisciplineComponent,
    KlassenImportComponent,
    ActivateDisciplineComponent,
    UserAccountControlComponent,
    PasswordChangeComponent,
    FooterComponent,
    CreateSportfestComponent,
    AreYouSureComponent,
    MobileHeaderComponent,
    MobileMenuListComponent,
    MobileHeaderImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routConfig, { useHash: true}),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    TechnischerService,
    SportfestService,
    RouteGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    Md5
  ],
  entryComponents: [
    LoginComponent,
    PasswordChangeComponent,
    AreYouSureComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
