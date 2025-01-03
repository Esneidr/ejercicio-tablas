import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../shared/components/table/table.component";
import { car } from '../../interfaces/car';
import { TableColumn } from '../../interfaces/table-Columns';
import { TableConfig } from '../../interfaces/table-Config';
import { timer } from 'rxjs';
import { dataCars } from '../../services/car-service';

@Component({
  selector: 'carros',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  Cars: car[] = [];
  tableColumns: TableColumn<car>[] = [];
  tableConfig!: TableConfig
  isLoadingCar = true;


  ngOnInit(): void {
    this.getData();
    this.setTableColumns();
    this.setTableConfig();
  }

  setTableConfig(){
    this.tableConfig = {
      isSelectable: false,
      paginator: {
        showInfo: true,
        pageSizeOptions: [5, 15, 50],
        showFirstLastButtons: true
      }
    }
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Placa',
        def:'plate',
        content: (row) => row.plate
      },
      {
        label: 'Marca',
        def: 'make',
        content: (row) => row.make
      },
      {
        label: 'Año',
        def: 'age',
        content: (row) => row.age.toString()
      },
      {
        label: 'Color',
        def: 'color',
        content: (row) => row.color
      },
      {
        label: 'Precio',
        def: 'price',
        content: (row) => row.price.toString()
      }
    ]
  }

  getData() {
    timer(1500).subscribe(() => {
      this.isLoadingCar = false;
      this.Cars = dataCars.getData(200);
    })
  }

}
