import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelWomenComponent } from './apparel-women.component';

describe('ApparelWomenComponent', () => {
  let component: ApparelWomenComponent;
  let fixture: ComponentFixture<ApparelWomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelWomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
