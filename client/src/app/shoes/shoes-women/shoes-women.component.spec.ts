import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesWomenComponent } from './shoes-women.component';

describe('ShoesWomenComponent', () => {
  let component: ShoesWomenComponent;
  let fixture: ComponentFixture<ShoesWomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoesWomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
