import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhqComponent } from './view-phq.component';

describe('ViewPhqComponent', () => {
  let component: ViewPhqComponent;
  let fixture: ComponentFixture<ViewPhqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPhqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPhqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
