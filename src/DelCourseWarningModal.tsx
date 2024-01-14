/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React from "react";
import "./App.css";
import { Button, Modal } from "react-bootstrap";

export function DelCourseWarningModal({
    show,
    handleClose,
    delCourse,
    courseCode
}: {
    show: boolean;
    handleClose: () => void;
    delCourse: (courseCode: string) => void;
    courseCode: string;
}): JSX.Element {
    const handleCloseModal = () => {
        handleClose();
    };
    const handleDeleteCourse = () => {
        delCourse(courseCode);
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>Are you sure you want to delete the course?</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteCourse}>
                        Yes
                    </Button>
                    <Button variant="warning" onClick={handleCloseModal}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
