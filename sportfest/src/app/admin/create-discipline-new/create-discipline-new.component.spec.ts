import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisciplineNewComponent } from './create-discipline-new.component';

describe('CreateDisciplineNewComponent', () => {
  let component: CreateDisciplineNewComponent;
  let fixture: ComponentFixture<CreateDisciplineNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDisciplineNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDisciplineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
