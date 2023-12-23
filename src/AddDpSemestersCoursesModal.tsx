/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./interfaces/degreeplan";
import { Button, Form, Modal } from "react-bootstrap";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";
import { CourseSearchDropDown } from "./CourseSearchDropdown";

//todo: I want to completely change the way we present the ability to add a new dp modal in
//      terms of adding semester and the ui presentation
//      1)make a dropdown next the the adding semester which allows them to pick a year in which
//        the semester will fall on (2019, 2020, etc). (DONE)
//      2)The modal UI should create a table that lays out things like current classes added, buttons, semester, etc
//      3)Fix the Course Search so that the search bar and "enter course" are next to each other. (DONE)

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
                    <Form.Label>Title: </Form.Label>
                    <Form.Control
                        defaultValue="Example Title"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTitle(e.target.value)
                        }
                    ></Form.Control>
                    <div>
                        <h5>Add Semesters and Courses</h5>
                        <div>
                            <select
                                defaultValue={"Fall"}
                                onChange={(e) =>
                                    setSelectedSemester(e.target.value)
                                }
                            >
                                {semesterOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={semesterYear}
                                onChange={(e) =>
                                    setSemesterYear(Number(e.target.value))
                                }
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            <button onClick={addSemester}>Add Semester</button>
                        </div>
                        <ul>
                            {semesters.map((semester) => (
                                <li key={semester.id}>
                                    <div>
                                        Semester: {semester.title}
                                        <button
                                            onClick={() =>
                                                deleteSemester(semester.id)
                                            }
                                        >
                                            Delete Semester
                                        </button>
                                    </div>
                                    <div className="courses">
                                        {semester.courses.map(
                                            (course, courseIndex) => (
                                                <div
                                                    key={courseIndex}
                                                    className="course"
                                                >
                                                    <span>
                                                        Course Code:{" "}
                                                        {course.code}
                                                        <br />
                                                        Course Title:{" "}
                                                        {course.name}
                                                        <br />
                                                        Credits:{" "}
                                                        {course.credits}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            deleteCourse(
                                                                semester.id,
                                                                courseIndex,
                                                                course.credits
                                                            )
                                                        }
                                                    >
                                                        Delete Course
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleSelectSemester(semester.id)
                                        }
                                    >
                                        Add Course
                                    </button>
                                    {selectedSemesterId === semester.id && (
                                        <div>
                                            <CourseSearchDropDown
                                                allCourses={allCourses}
                                                updateCourseCodeAndAddCourse={
                                                    addCourse
                                                }
                                                semesterId={semester.id}
                                            ></CourseSearchDropDown>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
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
