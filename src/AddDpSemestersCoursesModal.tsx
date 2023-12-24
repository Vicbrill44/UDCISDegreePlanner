/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./interfaces/degreeplan";
import {
    Button,
    Form,
    Modal,
    Table,
    Container,
    Row,
    Col,
    Card
} from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { CourseSearchDropDown } from "./CourseSearchDropdown";

export function AddDpSemestersCoursesModal({
    show,
    handleClose,
    addDp,
    allCourses
}: {
    show: boolean;
    handleClose: () => void;
    addDp: (newdp: DegreePlan) => void;
    allCourses: Course[];
}): JSX.Element {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (v, i) => currentYear + i); // Next 20 years

    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [selectedSemester, setSelectedSemester] = useState<string>("Fall");
    const [title, setTitle] = useState<string>("Example Title");
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

    const addSemester = () => {
        const newSemesterObj: Semester = {
            id: semesters.length + 1,
            title: selectedSemester + " " + semesterYear.toString(),
            courses: [],
            totalCredits: 0,
            year: semesterYear
        };
        setSemesters([...semesters, newSemesterObj]);
    };

    function creditsToNum(credits: string): number {
        const credsToNum = Number(credits);
        if (Number.isNaN(credsToNum)) {
            return 1;
        }
        return credsToNum;
    }

    function updateSemesterCredits(semesterId: number, credits: string) {
        //todo: clean up credits so that it is a number not a string.
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

    //todo: create a function that is purely to remove course credits
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
        setTitle("Example Title");
        setSelectedSemester("Fall");
        setSelectedSemesterId(null);
        setSemesterYear(currentYear);
        setSemesters([]);
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
        handleClose();
    };

    const saveChanges = () => {
        const newDp: DegreePlan = {
            title: title,
            id: 0,
            totalCredits: totDpSemesterCredits(),
            semestersList: semesters
        };
        setSemesterYear(currentYear);
        addDp(newDp);
        handleCloseModal();
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Add New Degree Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>
                        <h5>Title</h5>
                    </Form.Label>
                    <Form.Control
                        className="newDpTitle"
                        defaultValue="Example Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="addSemesterCourses">
                        <h5>Add Semesters and Courses</h5>
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
                                                <p>{semester.title}</p>
                                                <p>
                                                    Total Credits:{" "}
                                                    {semester.totalCredits}
                                                </p>
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
                                                                        <p>
                                                                            {course.code +
                                                                                "-" +
                                                                                course.name}
                                                                        </p>
                                                                        <p>
                                                                            Course
                                                                            Credits:{" "}
                                                                            {
                                                                                course.credits
                                                                            }
                                                                        </p>

                                                                        <p
                                                                            style={{
                                                                                textAlign:
                                                                                    "center"
                                                                            }}
                                                                        >
                                                                            Course
                                                                            Description:{" "}
                                                                            {
                                                                                course.descr
                                                                            }
                                                                        </p>
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
