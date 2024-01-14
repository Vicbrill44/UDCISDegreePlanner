/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React from "react";
import "./App.css";
import { TaskTable } from "./TaskTable";
import { Course } from "./interfaces/course";
import { Button, Modal } from "react-bootstrap";

export function CoursesModal({
    show,
    handleClose,
    allCourses,
    editCourse,
    delCourse
}: {
    show: boolean;
    handleClose: () => void;
    allCourses: Course[];
    editCourse: (editableCourse: Course) => void;
    delCourse: (courseCode: string) => void;
}): JSX.Element {
    const handleCloseModal = () => {
        handleClose();
    };

    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                fullscreen={true}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>View all Courses</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskTable
                        data={allCourses}
                        editCourse={editCourse}
                        delCourse={delCourse}
                    ></TaskTable>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
