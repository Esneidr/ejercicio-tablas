export interface TableConfig {
  isSelectable?: boolean

  paginator: {
    showInfo?: boolean;
    pageSizeOptions?: number[];
    showFirstLastButtons?: boolean;
  }
}
