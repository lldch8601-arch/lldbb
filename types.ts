
export enum TabType {
  SALES_PROFIT = '销售额与利润进度',
  ORDER_STATS = '订单统计',
  ACCOUNT_STATS = '人均统计 | 账号统计',
  SELF_LISTING = '自主/自动刊登销量',
  LISTING_CONVERSION = 'ASIN转化统计',
  WAREHOUSE_SALES = '本地仓销量 | 海外仓销量 | FBA仓销量'
}

export interface TableRow {
  department: string;
  isSubRow?: boolean;
  level?: number;
  subRows?: TableRow[];
  [key: string]: any;
}

export interface ColumnGroup {
  title: string;
  bgColor?: string;
  columns: Column[];
}

export interface Column {
  header: string;
  key: string;
  format?: 'currency' | 'percent' | 'number' | 'string' | 'trend';
  currencySymbol?: string;
  sortable?: boolean;
}
