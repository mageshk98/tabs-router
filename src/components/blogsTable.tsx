import { useTabs } from "../hooks/useTabs";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import type { Track, TracksTableProps } from "../definitions/types";
import { useMemo, useState } from "react";
import "./styles.css";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

const columnHelper = createColumnHelper<Track>();

export function BlogsTable({ data }: TracksTableProps) {
  const { openTab } = useTabs();
  const [sorting, setSorting] = useState<SortingState>([
    { id: "title", desc: false },
    { id: "author", desc: false },
  ]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", {
        id: "title",
        header: "Title",
        cell: (info) => {
          const { id, title } = info.row.original;
          return (
            <p
              onClick={() => openTab(id, title, `/blogs/${id}`)}
              className="table-title-link"
            >
              {info.getValue()}
            </p>
          );
        },
      }),
      {
        id: "author",
        accessorKey: "author",
        header: "Author",
        cell: (info) => info.row.original.author?.name ?? "—",
      },
    ],
    []
  );

  const table = useReactTable<Track>({
    columns,
    data: data,
    state: { sorting },
    enableSortingRemoval: false,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(), //row
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="table-head"
                onClick={header.column.getToggleSortingHandler()}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <ArrowUpNarrowWide size={16} strokeWidth={1.75} />,
                    desc: <ArrowDownNarrowWide size={16} strokeWidth={1.75} />,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
