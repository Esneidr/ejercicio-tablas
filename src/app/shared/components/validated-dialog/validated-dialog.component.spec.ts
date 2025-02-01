import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedDialogComponent } from './validated-dialog.component';

describe('ValidatedDialogComponent', () => {
  let component: ValidatedDialogComponent;
  let fixture: ComponentFixture<ValidatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
