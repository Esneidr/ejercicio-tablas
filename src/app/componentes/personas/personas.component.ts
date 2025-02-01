import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { dataPerson } from '../../services/person-service';
import { TableColumn } from '../../interfaces/table-Columns';
import { person } from '../../interfaces/person';
import { TableConfig } from '../../interfaces/table-Config';
import { timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';
import { DialogService } from '../../shared/services/dialog.service';
import { AddEditPersonComponent } from '../../shared/components/add-edit-person/add-edit-person.component';
import { ValidatedDialogComponent } from '../../shared/components/validated-dialog/validated-dialog.component';

@Component({
  selector: 'personas',
  standalone: true,
  imports: [
    TableComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css',
})
export class PersonasComponent implements OnInit {
  private readonly dialog = inject(DialogService);

  listExportExcel: any[] = [];
  Persons: person[] = [];
  tableColumns: TableColumn<person>[] = [];
  isLodingPerson = true;
  tableConfig!: TableConfig;
  personSelected: person[] = [];
  table = viewChild(TableComponent);
  colActions = viewChild.required('colActions', { read: TemplateRef });

  ngOnInit(): void {
    this.getData();
    this.setTableColumns();
    this.setTableConfig();
  }

  addPerson() {
    this.dialog
      .open(AddEditPersonComponent)
      .afterClosed()
      .subscribe({
        next: (user) => {
          if (!user) return;
            const dialogRef = this.dialog.openDialog({
            type: 'success',
            title: 'Add user',
            message: 'has been added successfully!'
          });
          setTimeout(() => {
            dialogRef.close();
          }, 3000);
        },
      });
  }

  deletePerson(persons: person) {
    this.dialog.openDialog({
      type: 'warning',
      title: 'Delete user',
      message: `Are you sure you want to delete ${persons.userName}?`,
      buttons: {
        primary: {
          show: true,
          label: 'Delete'
        },
        secondary: {
          show: true,
          label: 'Cancel'
        }
      }
    })
  }

  editPerson(persons: person) {
    this.dialog
      .open(AddEditPersonComponent, { data : persons})
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!value) return;
          const dialogRef = this.dialog.openDialog({
            type: 'success',
            title: 'Person Updated',
            message:`${persons.userName} has been updated successfully.`
          });
          setTimeout(() => {
            dialogRef.close();
          }, 3000);
        },
      });
  }

  getSortingDataAccesor() {
    return (data: person, sortHeaderId: string) => {
      if (sortHeaderId === 'dateStart') {
        return data.dateStart.getMonth();
      }
      return (data as unknown as Record<string, any>)[sortHeaderId];
    };
  }

  onSendingEmails() {
    this.table()?.onClearSelection();
  }

  onSelectRows(rows: person[]) {
    this.personSelected = rows;
  }

  setTableConfig() {
    this.tableConfig = {
      isSelectable: true,
      paginator: {
        showInfo: true,
        pageSizeOptions: [5, 15, 50],
        showFirstLastButtons: true,
      },
    };
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Cedula',
        def: 'identity',
        content: (row) => row.identity.toString(),
      },
      {
        label: 'Nombre',
        def: 'userName',
        content: (row) => row.userName,
        isSortable: true,
      },
      {
        label: 'Apellido',
        def: 'lastName',
        content: (row) => row.lastName,
        isSortable: true,
      },
      {
        label: 'Edad',
        def: 'age',
        content: (row) => row.age.toString(),
        isSortable: true,
      },
      {
        label: 'Telefono',
        def: 'phone',
        content: (row) => row.phone.toString(),
      },
      {
        label: 'Cuidad',
        def: 'city',
        content: (row) => row.city,
        isSortable: true,
      },
      {
        label: 'Transporte',
        def: 'transport',
        content: (row) => row.transport,
        isSortable: true,
      },
      {
        label: 'Fecha',
        def: 'dateStart',
        content: (row) => new Date(row.dateStart).toLocaleDateString('es-Co'),
        isSortable: true,
      },
      {
        label: 'Acción',
        def: 'action',
        template: this.colActions(),
      },
    ];
  }

  getData() {
    timer(1500).subscribe(() => {
      this.isLodingPerson = false;
      this.Persons = dataPerson.getData(100);
    });
  }

  downloadExcel() {
    timer(2000).subscribe(() => {
      this.listExportExcel = this.Persons.map((item) => {
        return {
          ['Cedula']: item.identity,
          ['Nombre']: item.userName,
          ['Apellido']: item.lastName,
          ['Edad']: item.age,
          ['Telefono']: item.phone,
          ['Cuidad']: item.city,
          ['Transporte']: item.transport,
          ['Fecha']: item.dateStart,
        };
      });
      this.exportToExcel(this.listExportExcel);
    });
  }

  exportToExcel(listExportExcel: any) {
    // almacena la información que estará en la primera hoja
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listExportExcel);
    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transporte');
    //save to file
    XLSX.writeFile(wb, 'Reporte.xlsx');
  }
}
