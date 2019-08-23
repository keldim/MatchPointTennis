import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoeDetailComponent } from './shoe-detail.component';

describe('ShoeDetailComponent', () => {
  let component: ShoeDetailComponent;
  let fixture: ComponentFixture<ShoeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
