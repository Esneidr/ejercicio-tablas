import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { person } from '../../../interfaces/person';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-edit-person',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-person.component.html',
  styleUrl: './add-edit-person.component.css'
})
export class AddEditPersonComponent {
  readonly data = inject<person>(MAT_DIALOG_DATA)
  readonly formPerson = new FormGroup<any>({
    identity: new FormControl(this.data?.identity),
    name: new FormControl(this.data?.userName),
    lastName: new FormControl(this.data?.lastName),
    age: new FormControl(this.data?.age),
    phone: new FormControl(this.data?.phone),
    city: new FormControl(this.data?.city),
    transport: new FormControl(this.data?.transport),
    date: new FormControl(this.data?.dateStart)
  });
}
