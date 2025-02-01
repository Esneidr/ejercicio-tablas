import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { dialogData } from '../../../interfaces/dialogData';

@Component({
  selector: 'app-validated-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './validated-dialog.component.html',
  styleUrl: './validated-dialog.component.css'
})
export class ValidatedDialogComponent {
  readonly data = inject<dialogData>(MAT_DIALOG_DATA)
}
