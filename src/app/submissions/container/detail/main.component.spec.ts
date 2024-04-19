import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailApplicationComponent } from './main.component';

describe('DetailApplicationComponent', () => {
  let component: DetailApplicationComponent;
  let fixture: ComponentFixture<DetailApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
