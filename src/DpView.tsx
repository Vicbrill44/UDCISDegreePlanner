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
                        <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                            {dp.title}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col
                        style={{
                            paddingTop: "15px",
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingBottom: "15px"
                        }}
                    >
                        <h3>Total Credits: {dp.totalCredits}</h3>
                    </Col>
                </Row>
                <Row>
                    <Table borderless>
                        <thead>
                            <tr>
                                {dp.semestersList.map((semester: Semester) => (
                                    <th key={semester.title}>
                                        <Card bg="warning">
                                            <h5
                                                style={{
                                                    textAlign: "center",
                                                    paddingBottom: "20px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {semester.title}
                                            </h5>
                                            <h5
                                                style={{
                                                    textAlign: "center",
                                                    paddingBottom: "20px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                Total Credits:{" "}
                                                {semester.totalCredits}
                                            </h5>
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
                                                <h5
                                                    style={{
                                                        textAlign: "center",
                                                        paddingBottom: "20px",
                                                        wordSpacing: "5px",
                                                        lineHeight: "25px"
                                                    }}
                                                >
                                                    {course.name}
                                                </h5>
                                            </Card>
                                            <Table>
                                                <Card bg="info" text="dark">
                                                    <tbody>
                                                        <td className="dp_viewer_courses">
                                                            <h4
                                                                style={{
                                                                    paddingTop:
                                                                        "10px",
                                                                    textAlign:
                                                                        "center",
                                                                    wordSpacing:
                                                                        "5px"
                                                                }}
                                                            >
                                                                Course Credits:{" "}
                                                                {course.credits}
                                                            </h4>
                                                            <h4
                                                                style={{
                                                                    paddingTop:
                                                                        "10px",
                                                                    textAlign:
                                                                        "center",
                                                                    wordSpacing:
                                                                        "5px"
                                                                }}
                                                            >
                                                                Course Code:{" "}
                                                                {course.code}
                                                            </h4>
                                                            <h4
                                                                style={{
                                                                    paddingTop:
                                                                        "10px",
                                                                    textAlign:
                                                                        "center",
                                                                    wordSpacing:
                                                                        "5px",
                                                                    lineHeight:
                                                                        "25px"
                                                                }}
                                                            >
                                                                Course
                                                                Description:{" "}
                                                                {course.descr}
                                                            </h4>
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
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: "10px" }}
            >
                <Button variant="danger" onClick={resetView}>
                    Exit
                </Button>
                <Button variant="danger" onClick={deleteDegreePlan}>
                    Delete
                </Button>
                <Button variant="warning" onClick={handleShowModal}>
                    Edit
                </Button>
                <EditingDp
                    show={showEditModal}
                    handleClose={handleCloseModal}
                    dp={dp}
                    editDp={editDp}
                    allCourses={allCourses}
                ></EditingDp>
            </div>
        </div>
    );
}
