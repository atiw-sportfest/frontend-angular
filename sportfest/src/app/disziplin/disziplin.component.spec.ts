import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisziplinComponent } from './disziplin.component';
import { MaterialModule } from '@angular/material';

describe('DisziplinComponent', () => {
  let component: DisziplinComponent;
  let fixture: ComponentFixture<DisziplinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ DisziplinComponent ]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(DisziplinComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(DisziplinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add a Teilnehmer', () => {
    let anzahl = component.selectedAnmeldungen.length;
    component.teilnehmerHinzufuegen(); 
    expect(component.selectedAnmeldungen.length).toBe(anzahl+1);
  })
});
