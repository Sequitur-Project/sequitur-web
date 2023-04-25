import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntentComponent } from './edit-intent.component';

describe('EditIntentComponent', () => {
  let component: EditIntentComponent;
  let fixture: ComponentFixture<EditIntentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIntentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
