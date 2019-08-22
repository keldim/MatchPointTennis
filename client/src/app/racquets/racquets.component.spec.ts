import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacquetsComponent } from './racquets.component';

describe('RacquetsComponent', () => {
  let component: RacquetsComponent;
  let fixture: ComponentFixture<RacquetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacquetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacquetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
