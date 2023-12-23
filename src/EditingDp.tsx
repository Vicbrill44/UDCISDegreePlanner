/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useState } from "react";
import "./App.css";
import { DegreePlan } from "./interfaces/degreeplan";
import { Button, Form, Modal } from "react-bootstrap";
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
        //todo: add the function that is made strictly for handling removing a course creds
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
                <Modal.Title>Add New Degree Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Title: </Form.Label>
                    <Form.Control
                        defaultValue={title}
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
