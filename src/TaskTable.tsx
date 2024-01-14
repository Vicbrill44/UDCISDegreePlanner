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
import { EditCourseModal } from "./EditCourseModal";
import { DelCourseWarningModal } from "./DelCourseWarningModal";

type TableCellProps<T> = {
    getValue: () => T;
};

type Filter = {
    id: string;
    value: string;
};

export function TaskTable({
    data,
    editCourse,
    delCourse
}: {
    data: Course[];
    editCourse: (editableCourse: Course) => void;
    delCourse: (courseCode: string) => void;
}): JSX.Element {
    const [columnFilters, setColumnFilters] = useState<Filter[]>([]);
    const [editableCourse, setEditableCourse] = useState<Course>({
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    });

    const [courseToDel, setCourseToDel] = useState<string>("");

    //delete course warning modal funct.
    const [showCourseDelModal, setShowCourseDelModal] =
        useState<boolean>(false);
    const handleCloseCourseDelModal = () => setShowCourseDelModal(false);
    const handleShowCourseDelModal = (courseCode: string) => {
        setShowCourseDelModal(true);
        setCourseToDel(courseCode);
    };

    //edit course modal funct.
    const [showEditCourseModal, setShowEditCourseModal] =
        useState<boolean>(false);

    //current course being edited
    const courseToEdit = (courseCode: string) => {
        const course: Course | undefined = data.find(
            (course) => course.code === courseCode
        );
        if (course) {
            setEditableCourse(course);
        }
        //set course to be default if not exist
    };

    const handleCloseEditCourseModal = () => setShowEditCourseModal(false);
    const handleShowEditCourseModal = (courseCode: string) => {
        courseToEdit(courseCode);
        setShowEditCourseModal(true);
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
        },
        {
            accessorKey: "code",
            cell: (props: TableCellProps<string>) => (
                <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleShowEditCourseModal(props.getValue())}
                >
                    Edit
                </Button>
            )
        },
        {
            accessorKey: "code",
            cell: (props: TableCellProps<string>) => (
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleShowCourseDelModal(props.getValue())}
                >
                    Delete
                </Button>
            )
        }
    ];

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
            <EditCourseModal
                show={showEditCourseModal}
                handleClose={handleCloseEditCourseModal}
                course={editableCourse}
                editCourse={editCourse}
                allCourses={data}
            ></EditCourseModal>
            <DelCourseWarningModal
                show={showCourseDelModal}
                handleClose={handleCloseCourseDelModal}
                delCourse={delCourse}
                courseCode={courseToDel}
            ></DelCourseWarningModal>
        </div>
    );
}
