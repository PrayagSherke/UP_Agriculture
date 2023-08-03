export interface TableColumn {
    name: string;
    dataKey: string[];
    position?: 'right' | 'left' | 'center';
    isSortable?: boolean;
}

export interface TableAction {
    icon: string;
    handler: (row: any) => void;
  }
  