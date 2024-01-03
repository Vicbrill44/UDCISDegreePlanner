import { Form, InputGroup } from "react-bootstrap";
import React from "react";

type Filter = {
    id: string;
    value: string;
};

type TaskTableFiltersProps = {
    columnFilters: Filter[];
    setColumnFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
};

const TaskTableFilters = ({
    columnFilters,
    setColumnFilters
}: TaskTableFiltersProps) => {
    const codeName =
        columnFilters.find((f: { id: string }) => f.id === "code")?.value || "";
    const onFilterChange = (id: string, value: string) =>
        setColumnFilters((prev) =>
            prev.filter((f) => f.id !== id).concat({ id, value })
        );
    return (
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search Course Code"
                    aria-describedby="basic-addon2"
                    value={codeName}
                    onChange={(e) => onFilterChange("code", e.target.value)}
                />
            </InputGroup>
        </div>
    );
};

export default TaskTableFilters;
