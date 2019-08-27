import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelMenComponent } from './apparel-men.component';

describe('ApparelMenComponent', () => {
  let component: ApparelMenComponent;
  let fixture: ComponentFixture<ApparelMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
