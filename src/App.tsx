/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useEffect, useState } from "react";
import "./css_reset.css";
import "./App.css";
import { DegreePlan } from "./interfaces/degreeplan";
import dpsamplejson from "./sampleDpData.json"; //this is the real json data that the user will start with if they are new
import { Button } from "react-bootstrap";
import { DpList } from "./DpList";
import { AddDpSemestersCoursesModal } from "./AddDpSemestersCoursesModal";
import all_courses_json from "./data/catalog.json";
import { Course } from "./interfaces/course";
import { Header } from "./Header";
import { HowToText } from "./HowToTexxt";
import { CoursesModal } from "./CoursesModal";
import { AddCourseModal } from "./AddCourseModal";
//import { CourseSearchDropDown } from "./CourseSearchDropdown";

export function App(): JSX.Element {
    //load in courses
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [newAddedCourses, setNewAddedCourses] = useState<Course[]>([]);
    const SAVED_ADDEDCOURSES = "MY-PAGE-ADDEDCOURSES";
    useEffect(() => {
        const extractedCourses: Course[] = Object.values(
            all_courses_json
        ).flatMap((departmentCourses) => Object.values(departmentCourses));
        setAllCourses(extractedCourses);

        //load in manually added courses
        let default_addedCourses: Course[] = [];
        const previousCourses = localStorage.getItem(SAVED_ADDEDCOURSES);
        if (previousCourses !== null) {
            default_addedCourses = JSON.parse(previousCourses);
        }
        setAllCourses((existingCourses) => [
            ...existingCourses,
            ...default_addedCourses
        ]);
    }, []);

    //load in json data
    const DEGREEPLANS: DegreePlan[] = dpsamplejson.map(
        (dp: DegreePlan): DegreePlan => ({ ...dp }) //dp = degreeplan
    );
    //this is the initial data that every user starts with
    let loaded_data = DEGREEPLANS;
    //this will be the key we use to access previous data
    const SAVE_KEY = "MY-PAGE-DEGREEPLANS";
    const previousData = localStorage.getItem(SAVE_KEY);
    //load data into loaded_data (will either overwrite loaded_data with previous data if user is not new or keep initial loaded data if user it new)

    if (previousData !== null) {
        loaded_data = JSON.parse(previousData);
    }

    //load in ID
    let default_id = 2;
    const SAVED_ID = "MY-PAGE-IDCOUNT";
    const previoudId = localStorage.getItem(SAVED_ID);
    if (previoudId !== null) {
        default_id = JSON.parse(previoudId);
    }

    //degreePlans will store and maintain the users degree plans, whenever they save their work it will be stored here
    const [degreePlans, setdegreePlans] = useState<DegreePlan[]>(loaded_data);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [availableId, setAvailableId] = useState<number>(default_id);
    const [showCoursesModal, setShowCoursesModal] = useState<boolean>(false);
    const [showAddCourseModal, setShowAddCourseModal] =
        useState<boolean>(false);
    //const [showHowToText, setShowHowToText] = useState<boolean>(true);
    //handles opening and closing the addDp popup (modal)
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);
    //handles opening and closing the courses popup (modal)
    const handleCloseCoursesModal = () => setShowCoursesModal(false);
    const handleShowCoursesModal = () => setShowCoursesModal(true);
    //will handle opening and closing the addCourseModal
    const handleCloseAddCourseModal = () => setShowAddCourseModal(false);
    const handleShowAddCourseModal = () => setShowAddCourseModal(true);

    //will check if the degreePlans and availableId states have changed and if so update the local storage
    useEffect(() => {
        localStorage.setItem(SAVE_KEY, JSON.stringify(degreePlans));
        localStorage.setItem(SAVED_ID, JSON.stringify(availableId));
    }, [degreePlans, availableId]);

    //will check if the newAddedCourses state changed and if so update the local storage
    useEffect(() => {
        localStorage.setItem(
            SAVED_ADDEDCOURSES,
            JSON.stringify(newAddedCourses)
        );
    }, [newAddedCourses]);

    //will be what happens when we add a new course: will have to save the new courses added in a localstorage
    const addCourse = (newCourse: Course) => {
        console.log(newCourse);
        setNewAddedCourses([...newAddedCourses, newCourse]);
        setAllCourses([...allCourses, newCourse]);
    };

    function addDp(newDp: DegreePlan) {
        const exists = degreePlans.find(
            (dp: DegreePlan): boolean => dp.title === newDp.title
        );
        if (exists === undefined) {
            setdegreePlans([
                ...degreePlans,
                {
                    title: newDp.title,
                    id: availableId,
                    totalCredits: newDp.totalCredits,
                    semestersList: newDp.semestersList
                }
            ]);
            setAvailableId(availableId + 1);
        }
    }

    function deleteDp(id: number) {
        const updatedDps = degreePlans.filter((dp) => dp.id !== id);
        setdegreePlans(updatedDps);
    }

    function editDegreePlan(id: number, newDp: DegreePlan) {
        setdegreePlans(
            degreePlans.map(
                (dp: DegreePlan): DegreePlan => (dp.id === id ? newDp : dp)
            )
        );
    }

    function editCourse(editedCourse: Course) {
        setAllCourses(
            allCourses.map(
                (course: Course): Course =>
                    course.code === editedCourse.code ? editedCourse : course
            )
        );
    }

    function delCourse(courseCode: string) {
        const updatedCourses = allCourses.filter(
            (course) => course.code !== courseCode
        );
        setAllCourses(updatedCourses);
    }

    return (
        <div className="body">
            <div className="App">
                <div className="header_container">
                    <Header handClick={handleShowCoursesModal}></Header>
                </div>
                <HowToText></HowToText>
                <div className="dp_content">
                    <div className="Dplist_container">
                        <DpList
                            dp={degreePlans}
                            deleteDp={deleteDp}
                            editDp={editDegreePlan}
                            allCourses={allCourses}
                        ></DpList>
                    </div>
                    <div className="AddSaveButtons_container">
                        <Button
                            variant="warning"
                            className="add_btn"
                            onClick={handleShowAddModal}
                        >
                            Add New Degree Plan
                        </Button>
                        <Button
                            variant="warning"
                            onClick={handleShowAddCourseModal}
                        >
                            Add New Course
                        </Button>
                    </div>
                </div>
                <AddDpSemestersCoursesModal
                    show={showAddModal}
                    handleClose={handleCloseAddModal}
                    addDp={addDp}
                    allCourses={allCourses}
                ></AddDpSemestersCoursesModal>
                <CoursesModal
                    show={showCoursesModal}
                    handleClose={handleCloseCoursesModal}
                    allCourses={allCourses}
                    editCourse={editCourse}
                    delCourse={delCourse}
                ></CoursesModal>
                <AddCourseModal
                    show={showAddCourseModal}
                    handleClose={handleCloseAddCourseModal}
                    addCourse={addCourse}
                    allCourses={allCourses}
                ></AddCourseModal>
            </div>
        </div>
    );
}
