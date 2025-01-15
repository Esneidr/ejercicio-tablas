import { Component, OnInit, viewChild, ViewChildren } from '@angular/core';
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
//import as * XLSX from 'xlsx';

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
  Persons: person[] = [];
  tableColumns: TableColumn<person>[] = [];
  isLodingPerson = true;
  tableConfig!: TableConfig;
  personSelected: person[] = [];
  table = viewChild(TableComponent);

  ngOnInit(): void {
    this.getData();
    this.setTableColumns();
    this.setTableConfig();
  }

  getSortingDataAccesor() {
    return (data: person, sortHeaderId: string) => {
      if (sortHeaderId === 'dateStart') {
        return data.dateStart.getMonth();
      }
      return (data as unknown as Record<string, any>)[sortHeaderId];
    }
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
        isSortable: true
      },
      {
        label: 'Apellido',
        def: 'lastName',
        content: (row) => row.lastName,
        isSortable: true
      },
      {
        label: 'Edad',
        def: 'age',
        content: (row) => row.age.toString(),
        isSortable: true
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
        isSortable: true
      },
      {
        label: 'Transporte',
        def: 'transport',
        content: (row) => row.transport,
        isSortable: true
      },
      {
        label: 'Fecha',
        def: 'dateStart',
        content: (row) => new Date(row.dateStart).toLocaleDateString('es-Co'),
        isSortable: true
      },
    ];
  }

  getData() {
    timer(1000).subscribe(() => {
      this.isLodingPerson = false;
      this.Persons = dataPerson.getData(200);
    });
  }
}
