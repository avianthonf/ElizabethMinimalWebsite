"use client";

import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import styles from "./DataTable.module.css";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  className?: string;
}

/**
 * DataTable — accessible data table with sorting support.
 * Uses @tanstack/react-table for headless table logic.
 *
 * Usage:
 *   <DataTable
 *     data={students}
 *     columns={[
 *       { accessorKey: "name", header: "Name" },
 *       { accessorKey: "grade", header: "Grade" },
 *     ]}
 *   />
 */
export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
