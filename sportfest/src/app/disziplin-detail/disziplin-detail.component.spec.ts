import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisziplinDetailComponent } from './disziplin-detail.component';

describe('DisziplinDetailComponent', () => {
  let component: DisziplinDetailComponent;
  let fixture: ComponentFixture<DisziplinDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisziplinDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisziplinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
