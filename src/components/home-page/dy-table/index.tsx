import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import {
  SortConfig,
  SupportedExportFormat,
  TableColumn,
  TableData,
} from "@/components/home-page/models";
import {
  DUMMY_DATA,
  INITIAL_TABLE_COLUMNS,
  ITEMS_PER_PAGE,
} from "../constants";

const DynamicTable: React.FC = () => {
  const [columns, setColumns] = useState<TableColumn[]>(INITIAL_TABLE_COLUMNS);
  const [data, setData] = useState<TableData[]>(DUMMY_DATA);
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle search
  const filteredData = data.filter((row) =>
    columns.every(
      (col) =>
        searchQuery[col.key] === undefined ||
        row[col.key]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery[col.key].toLowerCase())
    )
  );

  // Paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Total Pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Handle file upload (JSON)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const parsedData = JSON.parse(result);

      // Replace dummy data with uploaded data, adding unique IDs to rows
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadedData = parsedData.map((row: any) => ({
        ...row,
        id: uuidv4(), // Assign unique ID to each row
      }));
      setData(uploadedData);
    };
    reader.readAsText(file);
  };

  // Handle adding a new column
  const addColumn = () => {
    const newKey = prompt("Enter a key for the new column:");
    const newLabel = prompt("Enter a label for the new column:");
    if (newKey && newLabel) {
      setColumns([
        ...columns,
        { id: uuidv4(), key: newKey, label: newLabel }, // Assign unique ID to the column
      ]);
      setData(data.map((row) => ({ ...row, [newKey]: "" })));
    }
  };

  // Handle removing a column
  const removeColumn = (id: string) => {
    const columnToRemove = columns.find((col) => col.id === id);
    if (!columnToRemove) return;

    setColumns(columns.filter((col) => col.id !== id));
    setData(
      data.map((row) => {
        const newRow = { ...row };
        delete newRow[columnToRemove.key];
        return newRow;
      })
    );
  };

  // Handle sorting
  const sortData = (key: string) => {
    const direction = sortConfig?.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
    setData([
      ...data.sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }),
    ]);
  };

  // Export table
  const exportTable = (format: SupportedExportFormat) => {
    let blob;
    if (format === "json") {
      blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
    } else if (format === "csv") {
      const csvContent = [columns.map((col) => col.label).join(",")]
        .concat(
          data.map((row) => columns.map((col) => row[col.key] || "").join(","))
        )
        .join("\n");
      blob = new Blob([csvContent], { type: "text/csv" });
    } else {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "table.xlsx");
      return;
    }
    saveAs(blob, `table.${format}`);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center dark:bg-gray-900 text-white">
      <div className="w-full max-w-6xl p-4 bg-gray-800 shadow-lg rounded-md">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="dark:bg-gray-700 dark:border-gray-600 border border-gray-300 text-gray-200 p-2 rounded"
          />

          <button
            onClick={addColumn}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Add Column
          </button>

          {["json", "csv", "xlsx"].map((format) => (
            <button
              key={format}
              onClick={() => exportTable(format as "csv" | "json" | "xlsx")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
            >
              Export {format.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-gray-700 shadow-md rounded-md">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                {columns.map((col) => (
                  <th key={col.id} className="py-2 px-4 text-left">
                    <div className="flex items-center">
                      {col.label}
                      <button
                        onClick={() => sortData(col.key)}
                        className="ml-2 text-blue-400"
                      >
                        {sortConfig?.key === col.key &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </button>
                      <button
                        onClick={() => removeColumn(col.id)}
                        className="ml-2"
                      >
                        ❌
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                {columns.map((col) => (
                  <th key={col.id} className="py-2 px-4">
                    <input
                      type="text"
                      placeholder={`Search ${col.label}`}
                      value={searchQuery[col.key] || ""}
                      onChange={(e) =>
                        setSearchQuery({
                          ...searchQuery,
                          [col.key]: e.target.value,
                        })
                      }
                      className="w-full bg-gray-600 text-gray-300 px-2 py-1 rounded focus:ring focus:ring-blue-500"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-600">
                  {columns.map((col) => (
                    <td key={col.id} className="py-2 px-4">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded transition ${
              currentPage === 1
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Previous
          </button>

          <span className="px-4">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded transition ${
              currentPage === totalPages
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
