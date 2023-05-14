import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingPhraseComponent } from './edit-training-phrase.component';

describe('EditTrainingPhraseComponent', () => {
  let component: EditTrainingPhraseComponent;
  let fixture: ComponentFixture<EditTrainingPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrainingPhraseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainingPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
