import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { car } from '../../interfaces/car';
import { TableColumn } from '../../interfaces/table-Columns';
import { TableConfig } from '../../interfaces/table-Config';
import { timer } from 'rxjs';
import { dataCars } from '../../services/car-service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';

@Component({
  selector: 'carros',
  standalone: true,
  imports: [
    TableComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css',
})
export class CarsComponent implements OnInit {
  listExportExcel: any[] = [];
  Cars: car[] = [];
  tableColumns: TableColumn<car>[] = [];
  tableConfig!: TableConfig;
  isLoadingCar = true;
  colActions = viewChild.required('colActions', { read: TemplateRef });

  ngOnInit(): void {
    this.getData();
    this.setTableColumns();
    this.setTableConfig();
  }

  onEditCar(carEdit: car) {
    console.log('Editar: ', carEdit);
  }

  onDeleteCar(carDelete: car) {
    console.log('Eliminar: ', carDelete);
  }

  setTableConfig() {
    this.tableConfig = {
      isSelectable: false,
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
        label: 'Placa',
        def: 'plate',
        content: (row) => row.plate,
      },
      {
        label: 'Marca',
        def: 'make',
        content: (row) => row.make,
        isSortable: true
      },
      {
        label: 'Año',
        def: 'age',
        content: (row) => row.age.toString(),
        isSortable: true
      },
      {
        label: 'Color',
        def: 'color',
        content: (row) => row.color,
        isSortable: true
      },
      {
        label: 'Precio',
        def: 'price',
        content: (row) => row.price.toString(),
        isSortable: true
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
      this.isLoadingCar = false;
      this.Cars = dataCars.getData(5);
    });
  }

  downloadExcel() {
    timer(2000).subscribe(() => {
      this.listExportExcel = this.Cars.map((item) => {
        return {
          ['Placa']: item.plate,
          ['Marca']: item.make,
          ['Año']: item.age,
          ['Color']: item.color,
          ['Precio']: item.price,
        };
      });
      this.exportToExcel(this.listExportExcel);
    });
  }

  exportToExcel(listExportExcel: any) {
    // almacena la información que estará en la primera hoja
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listExportExcel)
    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Vehiculos')
    //save to file
    XLSX.writeFile(wb, 'Reporte.xlsx')
  }

}
