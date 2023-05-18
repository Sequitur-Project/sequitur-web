import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBinnacleComponent } from './view-binnacle.component';

describe('ViewBinnacleComponent', () => {
  let component: ViewBinnacleComponent;
  let fixture: ComponentFixture<ViewBinnacleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBinnacleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBinnacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
