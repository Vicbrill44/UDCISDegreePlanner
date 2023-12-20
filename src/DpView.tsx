//todo: create a universal DpView for all Dp's
/* eslint-disable no-extra-parens */
//this will be the dp table shower
import React, { useState } from "react";
import { Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import { EditingDp } from "./EditingDp";

export function DpView({
    dp,
    resetView,
    deleteDp,
    editDp,
    allCourses
}: {
    dp: DegreePlan;
    resetView: () => void;
    deleteDp: (id: number) => void;
    editDp: (id: number, newDp: DegreePlan) => void;
    allCourses: Course[];
}): JSX.Element {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const handleCloseModal = () => setShowEditModal(false);
    const handleShowModal = () => setShowEditModal(true);

    const deleteDegreePlan = () => {
        deleteDp(dp.id);
        resetView();
    };
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>{dp.title}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Total Credits: {dp.totalCredits}</h4>
                    </Col>
                    <Col>
                        <h4>Degree Plan ID: {dp.id}</h4>
                    </Col>
                </Row>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                {dp.semestersList.map((semester: Semester) => (
                                    <th key={semester.title}>
                                        <Card bg="warning">
                                            <p>{semester.title}</p>
                                            <p>
                                                Total Credits:{" "}
                                                {semester.totalCredits}
                                            </p>
                                        </Card>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dp.semestersList.map((semester: Semester) => (
                                <td key={semester.title}>
                                    {semester.courses.map((course: Course) => (
                                        <div key={course.code}>
                                            <Card bg="light">
                                                <p>{course.name}</p>
                                            </Card>
                                            <Table>
                                                <Card bg="info" text="dark">
                                                    <tbody>
                                                        <td>
                                                            <p>
                                                                Course Credits:{" "}
                                                                {course.credits}
                                                            </p>
                                                            <p>
                                                                Course Code:{" "}
                                                                {course.code}
                                                            </p>
                                                            <p
                                                                style={{
                                                                    textAlign:
                                                                        "center"
                                                                }}
                                                            >
                                                                Course
                                                                Description:{" "}
                                                                {course.descr}
                                                            </p>
                                                        </td>
                                                    </tbody>
                                                </Card>
                                            </Table>
                                        </div>
                                    ))}
                                </td>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            <Button
                className="esc_button text-align-center"
                variant="danger"
                onClick={resetView}
            >
                Exit
            </Button>
            <Button
                className="esc_button text-align-center"
                variant="danger"
                onClick={deleteDegreePlan}
            >
                Delete
            </Button>
            <Button
                className="esc_button text-align-center"
                variant="warning"
                onClick={handleShowModal}
            >
                Edit{" "}
            </Button>
            <EditingDp
                show={showEditModal}
                handleClose={handleCloseModal}
                dp={dp}
                editDp={editDp}
                allCourses={allCourses}
            ></EditingDp>
        </div>
    );
}
