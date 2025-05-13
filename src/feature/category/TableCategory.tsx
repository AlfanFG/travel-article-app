import React from "react";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableData from "@/components/table";
import type { ICategory } from "./hooks";
import { formatDate } from "@/lib/utils";
import { useGetPagination } from "@/stores/paginationStore";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import ButtonModal from "@/components/buttons/modal-button";
import { useGetModalName } from "@/stores/modalStore";

interface ITableCategory {
  categories: IPaginateResponse<ICategory> | undefined;
}

export default function TableCategory({ categories }: ITableCategory) {
  const pagination = useGetPagination();
  const modalName = useGetModalName();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columns = React.useMemo<ColumnDef<ICategory, unknown>[]>(
    () => [
      {
        accessorKey: "No",
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.description,
        id: "description",
        header: "Description",
        cell: (info) => (info.getValue() ? info.getValue() : "-"),
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => `${row.createdAt}`,
        id: "created_at",
        header: "Created At",
        cell: (info) => formatDate(info.getValue() as Date | undefined),
        enableColumnFilter: false,
      },
      {
        accessorKey: "action",
        header: () => <span>Action</span>,
        cell: (info) => (
          <div className="flex gap-4">
            <ButtonModal
              name={"category-edit"}
              title={"Edit"}
              content={<>wef</>}
              className="bg-yellow-400 hover:bg-yellow-300"
              buttonLabel={<FaEdit />}
            />

            <Button className="bg-red-600">
              <FaTrash />
            </Button>
          </div>
        ),
        enableColumnFilter: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: categories?.data || [],
    columns,
    filterFns: {},
    state: {
      columnFilters,
      pagination,
    },
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="p-2">
      <TableData
        table={table}
        totalData={categories?.meta?.pagination?.total ?? 0}
        totalPage={categories?.meta?.pagination?.pageCount ?? 10}
      />
    </div>
  );
}
