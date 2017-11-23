import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisziplinComponent } from './disziplin.component';

describe('DisziplinComponent', () => {
  let component: DisziplinComponent;
  let fixture: ComponentFixture<DisziplinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisziplinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisziplinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
