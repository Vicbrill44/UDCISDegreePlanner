import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getFilteredRowModel,
    getPaginationRowModel
} from "@tanstack/react-table";
import { Course } from "./interfaces/course";
import React, { useState } from "react";
import { Table as BTable, Button, ButtonGroup } from "react-bootstrap";
import TaskTableFilters from "./TaskTableFilters";

type TableCellProps<T> = {
    getValue: () => T;
};

type Filter = {
    id: string;
    value: string;
};

const columns = [
    {
        accessorKey: "code",
        header: "code",
        cell: (props: TableCellProps<string>) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "name",
        header: "name",
        cell: (props: TableCellProps<string>) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "descr",
        header: "descr",
        cell: (props: TableCellProps<string>) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "credits",
        header: "credits",
        cell: (props: TableCellProps<string>) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "preReq",
        header: "preReq",
        cell: (props: TableCellProps<string>) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "restrict",
        header: "restrict",
        cell: (props: TableCellProps<string>) => <p>{props.getValue()}</p>
    }
];

export function TaskTable({ data }: { data: Course[] }): JSX.Element {
    //const [courses, setCourses] = useState<Course[]>(data);
    const [columnFilters, setColumnFilters] = useState<Filter[]>([]);

    const table = useReactTable({
        data: data,
        columns,
        state: { columnFilters },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });
    return (
        <div className="p-2">
            <TaskTableFilters
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            ></TaskTableFilters>
            <BTable
                striped
                bordered
                hover
                size="sm"
                width={table.getTotalSize()}
            >
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr className="ts_headerGroup" key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th className="ts_header" key={header.id}>
                                {header.column.columnDef.header}
                            </th>
                        ))}
                    </tr>
                ))}
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td className="ts_data" key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </BTable>
            <h6>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </h6>
            <ButtonGroup size="sm">
                <Button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    {"<"}
                </Button>
                <Button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    {">"}
                </Button>
            </ButtonGroup>
        </div>
    );
}
