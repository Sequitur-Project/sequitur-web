import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingPhraseComponent } from './add-training-phrase.component';

describe('AddTrainingPhraseComponent', () => {
  let component: AddTrainingPhraseComponent;
  let fixture: ComponentFixture<AddTrainingPhraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingPhraseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
