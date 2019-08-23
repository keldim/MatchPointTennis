import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacquetDetailComponent } from './racquet-detail.component';

describe('RacquetDetailComponent', () => {
  let component: RacquetDetailComponent;
  let fixture: ComponentFixture<RacquetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacquetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacquetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
