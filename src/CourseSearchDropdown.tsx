import React, { useState } from "react";
import { Course } from "./interfaces/course";
import { Button } from "react-bootstrap";

export const CourseSearchDropDown = ({
    allCourses,
    updateCourseCodeAndAddCourse,
    semesterId
}: {
    allCourses: Course[];
    updateCourseCodeAndAddCourse: (semesterId: number, code: string) => void;
    semesterId: number;
}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Course[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchTerm(searchWord);

        const newFilter = allCourses.filter((course: Course) => {
            return course.code.toUpperCase().includes(searchWord.toUpperCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const handleSelectingCourse = (code: string) => {
        setSearchTerm(code);
        setFilteredData([]);
    };

    const handleUpdateCourseCodeAndAddCourse = () => {
        updateCourseCodeAndAddCourse(semesterId, searchTerm);
        setSearchTerm("");
    };

    return (
        <div className="searchBarContainer">
            <div className="searchBar">
                <div className="searchBarTextfield">
                    <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search"
                        value={searchTerm}
                    />
                </div>
                <div className="coursesDropdown">
                    {filteredData.length !== 0 && (
                        <div className="courseQuery">
                            {filteredData.slice(0, 10).map((course: Course) => (
                                <a
                                    className="courseItem"
                                    onClick={() =>
                                        handleSelectingCourse(course.code)
                                    }
                                    key={course.code}
                                >
                                    {course.code}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Button
                size="sm"
                className="EnterCourseButton"
                onClick={handleUpdateCourseCodeAndAddCourse}
            >
                Enter Course
            </Button>
        </div>
    );
};
