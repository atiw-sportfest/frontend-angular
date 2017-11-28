import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateDisciplineComponent } from './activate-discipline.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SportfestService } from '../../sportfest.service';
import { TechnischerService } from '../../technischer.service';
import { MockBackend, MockConnection  } from '@angular/http/testing';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

describe('ActivateDisciplineComponent', () => {
  let component: ActivateDisciplineComponent;
  let fixture: ComponentFixture<ActivateDisciplineComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule],
      declarations: [ActivateDisciplineComponent],
      providers: [SportfestService, 
        TechnischerService, 
        {provide: Http, useClass: Http}, 
        {provide: Router, useClass: class {navigate = jasmine.createSpy("navigate");}}
      ]
    })
      .compileComponents().then(() => {

        fixture = TestBed.createComponent(ActivateDisciplineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(ActivateDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
