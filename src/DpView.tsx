//todo: create a universal DpView for all Dp's
/* eslint-disable no-extra-parens */
//this will be the dp table shower
import React, { useState } from "react";
import { Button, Table, Container, Row, Col, Card } from "react-bootstrap";
import { DegreePlan } from "./interfaces/degreeplan";
import { Semester } from "./interfaces/semester";
import { Course } from "./interfaces/course";
import { EditingDp } from "./EditingDp";
import { scienceRequirements } from "./interfaces/scienceRequirement";
import { coreCsCourses } from "./interfaces/coreCsCourses";
import { DpDelWarningModal } from "./DpDelWarning";

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

    //delete dp warning modal funct.
    const [showDpDelModal, setShowDpDelModal] = useState<boolean>(false);
    const handleCloseDpDelModal = () => setShowDpDelModal(false);
    const handleShowDpDelModal = () => setShowDpDelModal(true);

    const deleteDegreePlan = () => {
        deleteDp(dp.id);
        resetView();
    };
    function checkIfRequirementMet(degreePlan: DegreePlan): string | null {
        const courses = degreePlan.semestersList.flatMap((semester) =>
            semester.courses.map((course) => course.code)
        );

        for (const requirement of scienceRequirements) {
            const isMet = requirement.requiredCourses.every((reqCourse) =>
                courses.includes(reqCourse)
            );

            if (isMet) {
                return requirement.optionName; // Return the name of the met requirement
            }
        }

        return null;
    }
    function checkIfCoreRequirementsMet(degreePlan: DegreePlan): boolean {
        const courses = degreePlan.semestersList.flatMap((semester) =>
            semester.courses.map((course) => course.code)
        );

        const isMet = coreCsCourses.every((coreCourse) =>
            courses.includes(coreCourse)
        );

        if (isMet) {
            return true;
        }

        return false;
    }

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
                <Row className="d-flex justify-content-end">
                    {checkIfRequirementMet(dp) === null && (
                        <Card bg="warning" body style={{ width: "35rem" }}>
                            <p>
                                You have not met the science requirement, please
                                take a look at the resources page for more
                                information
                            </p>
                        </Card>
                    )}
                </Row>
                <Row className="d-flex justify-content-end">
                    {checkIfCoreRequirementsMet(dp) === false && (
                        <Card bg="warning" body style={{ width: "35rem" }}>
                            <p>
                                You have not met the core computer science
                                requirement, please take a look at the resources
                                page for more information
                            </p>
                        </Card>
                    )}
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
                <Button variant="danger" onClick={handleShowDpDelModal}>
                    Delete
                </Button>
                <DpDelWarningModal
                    show={showDpDelModal}
                    handleClose={handleCloseDpDelModal}
                    deleteDp={deleteDegreePlan}
                ></DpDelWarningModal>
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
