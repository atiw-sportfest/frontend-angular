import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EinheitVerwaltenComponent } from './einheit-verwalten.component';

describe('EinheitVerwaltenComponent', () => {
  let component: EinheitVerwaltenComponent;
  let fixture: ComponentFixture<EinheitVerwaltenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinheitVerwaltenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinheitVerwaltenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
