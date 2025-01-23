import { Component, OnInit, TemplateRef, viewChild } from '@angular/core';
import { companyProject } from '../../interfaces/companyProject';
import { TableComponent } from '../../shared/components/table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as XLSX from 'xlsx';
import { TableColumn } from '../../interfaces/table-Columns';
import { TableConfig } from '../../interfaces/table-Config';
import { timer } from 'rxjs';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    TableComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {

  constructor (
    private _company: CompanyService
  ) {}
  listExportExcel: any[] = [];
  Company: companyProject[] = []
  tableColumns: TableColumn<companyProject>[] = [];
  tableConfig!: TableConfig;
  isLoadingData = true;
  colActions = viewChild.required('colActions', { read: TemplateRef });

  ngOnInit(): void {
    this.getData();
    this.setTableColumns();
    this.setTableConfig();
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
        label: 'Nombre',
        def: 'employee',
        content: (row) => row.employee,
        isSortable: true
      },
      {
        label: 'Genero',
        def: 'gender',
        content: (row) => row.gender,
        isSortable: true
      },
      {
        label: 'Departamento',
        def: 'department',
        content: (row) => row.department,
        isSortable: true
      },
      {
        label: 'Cargo',
        def: 'position',
        content: (row) => row.position,
        isSortable: true
      },
      {
        label: 'Estudio',
        def: 'study',
        content: (row) => row.study,
        isSortable: true
      },
      {
        label: 'Edad',
        def: 'age',
        content: (row) => row.age.toString(),
        isSortable: true
      },
      {
        label: 'Estado',
        def: 'state',
        content: (row) => row.state,
        isSortable: true
      },
      {
        label: 'Causa',
        def: 'reason',
        content: (row) => row.reason
      },
      {
        label: 'Capacitado',
        def: 'trained',
        content: (row) => row.trained,
        isSortable: true
      },
      {
        label: 'Cuidad',
        def: 'city',
        content: (row) => row.city,
        isSortable: true
      },
      {
        label: 'Area',
        def: 'area',
        content: (row) => row.area,
        isSortable: true
      },
    ];
  }

  getData() {
    timer(1500).subscribe(() => {
      this.isLoadingData = false;
      this.Company = this._company.getData(100000);
    });
  }

  downloadExcel() {
    timer(2000).subscribe(() => {
      this.listExportExcel = this.Company.map((item) => {
        return{
          ['Nombre completo']: item.employee,
          ['Genero']: item.gender,
          ['Departamento']: item.department,
          ['Cargo']: item.position,
          ['Educación']: item.study,
          ['Edad']: item.age,
          ['Estado']: item.state,
          ['Causa']: item.reason,
          ['Capacitado']: item.trained,
          ['Cuidad']: item.city,
          ['Area']: item.area
        };
      });
      this.exportToExcel(this.listExportExcel);
    })

  }

  exportToExcel(listExportExcel: any) {
    // almacena la información que estará en la primera hoja
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(listExportExcel)
    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Compañia')
    //save to file
    XLSX.writeFile(wb, 'Reporte.xlsx')
  }

}
