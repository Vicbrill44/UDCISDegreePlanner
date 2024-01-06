/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./interfaces/degreeplan";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table
} from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { CourseSearchDropDown } from "./CourseSearchDropdown";

export function EditingDp({
    show,
    handleClose,
    dp,
    editDp,
    allCourses
}: {
    show: boolean;
    handleClose: () => void;
    dp: DegreePlan;
    editDp: (id: number, newdp: DegreePlan) => void;
    allCourses: Course[];
}): JSX.Element {
    //create all semester years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (v, i) => currentYear + i); // Next 20 years

    const [semesters, setSemesters] = useState<Semester[]>(dp.semestersList);
    const [selectedSemester, setSelectedSemester] = useState<string>("Fall");
    const [title, setTitle] = useState<string>(dp.title);
    const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(
        null
    );
    const [semesterYear, setSemesterYear] = useState<number>(currentYear);

    const [, setNewCourse] = useState<Course>({
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    });
    const handleSelectSemester = (semesterId: number) => {
        setSelectedSemesterId(semesterId);
        // Reset the course input fields when selecting a new semester
        setNewCourse({
            code: "",
            name: "",
            descr: "",
            credits: "",
            preReq: "",
            restrict: "",
            breadth: "",
            typ: ""
        });
    };

    //selectedSemester (term; fall,winter, spring summer)
    type TermValue = Record<string, number>;
    const termOrder: TermValue = { Summer: 4, Spring: 3, Winter: 2, Fall: 1 };

    const addSemester = () => {
        const newSemesterObj: Semester = {
            id: semesters.length + 1,
            title: selectedSemester + " " + semesterYear.toString(),
            courses: [],
            totalCredits: 0,
            year: semesterYear,
            term: selectedSemester
        };
        setSemesters(
            [...semesters, newSemesterObj].sort((a, b) => {
                if (a.year !== b.year) {
                    return a.year - b.year; // Sort by year first
                } else {
                    return termOrder[a.term] - termOrder[b.term]; // Then by term
                }
            })
        );
    };

    function creditsToNum(credits: string): number {
        const credsToNum = Number(credits);
        if (Number.isNaN(credsToNum)) {
            return 1;
        }
        return credsToNum;
    }

    function updateSemesterCredits(semesterId: number, credits: string) {
        const cleanedCredits: number = creditsToNum(credits);
        const modifiedSemester = semesters.map(
            (semester: Semester): Semester =>
                semester.id === semesterId
                    ? {
                          ...semester,
                          totalCredits: semester.totalCredits + cleanedCredits
                      }
                    : { ...semester }
        );
        setSemesters(modifiedSemester);
    }

    const addCourse = (semesterId: number, courseCode: string) => {
        if (selectedSemesterId !== null && courseCode) {
            const selectedCourse: Course | undefined = allCourses.find(
                (course) => course.code === courseCode
            );
            if (selectedCourse) {
                updateSemesterCredits(semesterId, selectedCourse.credits);
                setSemesters((prevSemesters) =>
                    prevSemesters.map((semester) =>
                        semester.id === semesterId
                            ? {
                                  ...semester,
                                  courses: [...semester.courses, selectedCourse]
                              }
                            : semester
                    )
                );
            }
        }
    };

    const deleteSemester = (id: number) => {
        const updatedSemesters = semesters.filter(
            (semester) => semester.id !== id
        );
        setSemesters(updatedSemesters);
    };
    function updateSemesterCreditsDelete(semesterId: number, credits: string) {
        const cleanedCredits: number = creditsToNum(credits);
        const modifiedSemester = semesters.map(
            (semester: Semester): Semester =>
                semester.id === semesterId
                    ? {
                          ...semester,
                          totalCredits: semester.totalCredits - cleanedCredits
                      }
                    : { ...semester }
        );
        setSemesters(modifiedSemester);
    }

    const deleteCourse = (
        semesterId: number,
        courseIndex: number,
        credits: string
    ) => {
        updateSemesterCreditsDelete(semesterId, credits);
        setSemesters((prevSemesters) =>
            prevSemesters.map((semester) =>
                semester.id === semesterId
                    ? {
                          ...semester,
                          courses: semester.courses.filter(
                              (_, index) => index !== courseIndex
                          )
                      }
                    : semester
            )
        );
    };
    function totDpSemesterCredits(): number {
        const totSemestersCredits: number = semesters.reduce(
            (currentTot: number, semester: Semester) =>
                currentTot + semester.totalCredits,
            0
        );
        return totSemestersCredits;
    }

    const semesterOptions = ["Fall", "Winter", "Spring", "Summer"];

    const handleCloseModal = () => {
        setSemesters(dp.semestersList);
        setTitle(dp.title);
        handleClose();
        setSemesterYear(currentYear);
    };
    const saveChanges = () => {
        const newDp: DegreePlan = {
            title: title,
            id: dp.id,
            totalCredits: totDpSemesterCredits(),
            semestersList: semesters
        };
        setSemesterYear(currentYear);
        editDp(dp.id, newDp);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} animation={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Add New Degree Plan</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>
                        <h5>Title</h5>
                    </Form.Label>
                    <Form.Control
                        className="newDpTitle"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="addSemesterCourses">
                        <h5 style={{ paddingBottom: "10px" }}>
                            Add Semesters and Courses
                        </h5>
                        <div className="addSemesterContainer">
                            <Row>
                                <Col>
                                    <Form.Select
                                        aria-label="Default select example"
                                        defaultValue={"Fall"}
                                        onChange={(e) =>
                                            setSelectedSemester(e.target.value)
                                        }
                                    >
                                        {semesterOptions.map(
                                            (option, index) => (
                                                <option
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Select
                                        value={semesterYear}
                                        onChange={(e) =>
                                            setSemesterYear(
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Button onClick={addSemester}>
                                        Add Semester
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <Container className="semesterCoursesContainer">
                            {semesters.map((semester) => (
                                <Row key={semester.id}>
                                    <Col>
                                        <Card>
                                            <Card.Header>
                                                <h5
                                                    style={{
                                                        paddingBottom: "10px"
                                                    }}
                                                >
                                                    {semester.title}
                                                </h5>
                                                <h5
                                                    style={{
                                                        paddingBottom: "10px"
                                                    }}
                                                >
                                                    Total Credits:{" "}
                                                    {semester.totalCredits}
                                                </h5>
                                                <Button
                                                    onClick={() =>
                                                        deleteSemester(
                                                            semester.id
                                                        )
                                                    }
                                                    size="sm"
                                                    variant="danger"
                                                >
                                                    Remove
                                                </Button>
                                            </Card.Header>
                                            <Card.Body>
                                                <Table striped bordered>
                                                    <tbody>
                                                        {semester.courses.map(
                                                            (
                                                                course,
                                                                courseIndex
                                                            ) => (
                                                                <tr
                                                                    key={
                                                                        courseIndex
                                                                    }
                                                                >
                                                                    <td>
                                                                        <h5
                                                                            style={{
                                                                                textAlign:
                                                                                    "center",
                                                                                paddingBottom:
                                                                                    "15px"
                                                                            }}
                                                                        >
                                                                            {course.code +
                                                                                "-" +
                                                                                course.name}
                                                                        </h5>
                                                                        <p
                                                                            style={{
                                                                                textAlign:
                                                                                    "center",
                                                                                paddingBottom:
                                                                                    "15px"
                                                                            }}
                                                                        >
                                                                            Course
                                                                            Credits:{" "}
                                                                            {
                                                                                course.credits
                                                                            }
                                                                        </p>

                                                                        <p
                                                                            style={{
                                                                                textAlign:
                                                                                    "center",
                                                                                wordSpacing:
                                                                                    "5px",
                                                                                lineHeight:
                                                                                    "20px",
                                                                                paddingBottom:
                                                                                    "15px"
                                                                            }}
                                                                        >
                                                                            Course
                                                                            Description:{" "}
                                                                            {
                                                                                course.descr
                                                                            }
                                                                        </p>
                                                                        <div className="d-flex justify-content-center align-items-center">
                                                                            <Button
                                                                                onClick={() =>
                                                                                    deleteCourse(
                                                                                        semester.id,
                                                                                        courseIndex,
                                                                                        course.credits
                                                                                    )
                                                                                }
                                                                                size="sm"
                                                                                variant="danger"
                                                                            >
                                                                                Remove
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </Table>
                                                <div className="addCourseContainer">
                                                    <Button
                                                        onClick={() =>
                                                            handleSelectSemester(
                                                                semester.id
                                                            )
                                                        }
                                                        size="sm"
                                                        variant="primary"
                                                    >
                                                        Add Course
                                                    </Button>
                                                    {selectedSemesterId ===
                                                        semester.id && (
                                                        <CourseSearchDropDown
                                                            allCourses={
                                                                allCourses
                                                            }
                                                            updateCourseCodeAndAddCourse={
                                                                addCourse
                                                            }
                                                            semesterId={
                                                                semester.id
                                                            }
                                                        />
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            ))}
                        </Container>
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
