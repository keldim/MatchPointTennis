import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherItemsDetailComponent } from './other-items-detail.component';

describe('OtherItemsDetailComponent', () => {
  let component: OtherItemsDetailComponent;
  let fixture: ComponentFixture<OtherItemsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherItemsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherItemsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
