import {
  AfterViewInit,
  Component,
  computed,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableColumn } from '../../../interfaces/table-Columns';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TableConfig } from '../../../interfaces/table-Config';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

type DataAccessor<T> = (data: T, sortHeaderId: string) => string | number

@Component({
  selector: 'class-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgClass,
    NgTemplateOutlet,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnInit, OnChanges, AfterViewInit {
  config = input<TableConfig>();
  dataSource = new MatTableDataSource<T>();
  data = input<T[]>([]);
  column = input<TableColumn<T>[]>([]);
  displayedColumns = computed(() => {
    const columns = this.column().map((col) => col.def);
    const config = this.config();

    if (config?.isSelectable) {
      columns.unshift('select');
    }

    return columns;
  });
  isLoading = input(false);
  selection = new SelectionModel<T>(true, []);
  selectRowEvent = output<T[]>();
  matSort = viewChild.required(MatSort);
  sortingDataAccessor = input<DataAccessor<T>>()

  private readonly paginator = viewChild(MatPaginator);

  constructor() {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator() ?? null;
    this.dataSource.sort = this.matSort();
    if (this.sortingDataAccessor() != undefined) {
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor() as DataAccessor<T>
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.setData();
    }
  }

  createFilter() {
    return (data: any, filter: string) : boolean => {
      const searchData = filter.trim().toLowerCase().split(' ');

      const columnActive = this.column().map(col => col.def);

      const dataString = columnActive
        .map(columnData => (data[columnData] || '').toString().toLowerCase())
        .join(' ');

      return searchData.every(tem => dataString.includes(tem))
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length >= 3) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onClear() {
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectRow(row: T, isChecked: boolean) {
    if (isChecked) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
    this.selectRowEvent.emit(this.selection.selected);
  }

  onToggleAll(isChecked: boolean) {
    if (isChecked) {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    } else {
      this.selection.clear();
    }
    this.selectRowEvent.emit(this.selection.selected);
  }

  onClearSelection() {
    this.selection.clear()
  }
  //#region Metodos Privados
  private setData() {
    this.dataSource.data = this.data();
  }
  //#endregion
}
