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
//import { CourseSearchDropDown } from "./CourseSearchDropdown";

export function App(): JSX.Element {
    //load in courses
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    useEffect(() => {
        const extractedCourses: Course[] = Object.values(
            all_courses_json
        ).flatMap((departmentCourses) => Object.values(departmentCourses));
        setAllCourses(extractedCourses);
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
    //const [showHowToText, setShowHowToText] = useState<boolean>(true);
    //handles opening and closing the popup (modal)
    const handleCloseModal = () => setShowAddModal(false);
    const handleShowModal = () => setShowAddModal(true);

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
    function saveData() {
        localStorage.setItem(SAVE_KEY, JSON.stringify(degreePlans));
        localStorage.setItem(SAVED_ID, JSON.stringify(availableId));
    }

    function editDegreePlan(id: number, newDp: DegreePlan) {
        setdegreePlans(
            degreePlans.map(
                (dp: DegreePlan): DegreePlan => (dp.id === id ? newDp : dp)
            )
        );
    }

    return (
        <div className="body">
            <div className="App">
                <div className="header_container">
                    <Header></Header>
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
                            onClick={handleShowModal}
                        >
                            Add New Degree Plan
                        </Button>
                        <Button variant="success" onClick={saveData}>
                            Save Degree Plans
                        </Button>
                    </div>
                </div>
                <AddDpSemestersCoursesModal
                    show={showAddModal}
                    handleClose={handleCloseModal}
                    addDp={addDp}
                    allCourses={allCourses}
                ></AddDpSemestersCoursesModal>
            </div>
        </div>
    );
}
