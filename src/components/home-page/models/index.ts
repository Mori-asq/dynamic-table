export type TableColumn = {
  id: string;
  key: string;
  label: string;
};

export type TableData = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

export type SupportedExportFormat = "csv" | "json" | "xlsx";
