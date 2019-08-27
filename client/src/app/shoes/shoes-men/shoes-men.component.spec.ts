import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesMenComponent } from './shoes-men.component';

describe('ShoesMenComponent', () => {
  let component: ShoesMenComponent;
  let fixture: ComponentFixture<ShoesMenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoesMenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesMenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
