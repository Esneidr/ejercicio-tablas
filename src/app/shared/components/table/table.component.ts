import {
  AfterViewInit,
  Component,
  computed,
  input,
  OnChanges,
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
    MatIconModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent<T> implements OnChanges, AfterViewInit {
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

  private readonly paginator = viewChild(MatPaginator);

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator() ?? null;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'].currentValue) {
      this.setData();
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
