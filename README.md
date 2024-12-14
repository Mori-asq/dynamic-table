# Dynamic Table Application

A dynamic and interactive table built with React and TypeScript. This application provides advanced functionalities such as column management, data sorting, searching, pagination, file upload, and exporting data in multiple formats (`JSON`, CSV, and `XLSX`).

---

## Features

### Core Features

- Dynamic Column Management
  - Add or remove table columns on the fly.
- Data Sorting
  - Sort table rows by column values in ascending or descending order.
- Search
  - Perform column-specific searches.
- Pagination
  - Navigate data with a user-friendly pagination system.
- File Upload
  - Import JSON files to populate the table dynamically.
- Data Export
  - Export the table data to:
    - JSON
    - CSV
    - XLSX (Excel format)

### Responsive Design

- The application is optimized for both desktop and mobile devices.
- Supports dark mode with consistent and aesthetic styles.

---

## Technologies Used

- React: Frontend framework for building the UI.
- TypeScript: Strongly typed language for robust and maintainable code.
- FileSaver.js: For exporting table data to files.
- xlsx: For handling Excel file exports.
- TailwindCSS: For a clean and responsive UI.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps to Run Locally

1. Clone the repository:

```
   git clone https://github.com/Mori-asq/dynamic-table.git
```

```
   cd dynamic-table
```

2. Install dependencies:

```
   npm install --legacy-peer-deps
```

3. Start the development server:

```
   npm run dev
```

4. Open in your browser:
   Visit [http://localhost:4200](http://localhost:4200) to use the application.

---

## Usage Instructions

### Adding a New Column

- Click the "Add Column" button.
- Enter the column key and label in the prompts.
- A new column will be added, and all rows will have an empty value for this column.

### Removing a Column

- Click the ❌ icon next to the column header.
- The column and its associated data will be removed from the table.

### Importing Data

- Click the "Choose File" button to upload a JSON file.
- Ensure the JSON file has an array of objects where each object represents a table row.

### Exporting Data

- Use the "Export JSON", "Export CSV", or "Export XLSX" buttons to download the table data in your desired format.

### Sorting

- Click the ▲ or ▼ icon in the column header to sort data in ascending or descending order.

### Searching

- Use the input boxes in the header to search by specific columns.

### Pagination

- Use the Previous and Next buttons at the bottom of the table to navigate through pages.
