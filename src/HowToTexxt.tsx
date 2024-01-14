/* eslint-disable no-extra-parens */
import React from "react";
import { Card } from "react-bootstrap";

export const HowToText = () => {
    return (
        <div className="howtotext_container">
            <div className="howtotext_info">
                <Card style={{ backgroundColor: "#00539f" }} text="light" body>
                    <h5>
                        This tool is used for planning your University of
                        Delaware Computer Science Degree
                    </h5>
                </Card>
            </div>
            <div className="howtotext_text">
                <h5 style={{ paddingTop: "15px" }}>
                    You are able to create multiple degree plans with the
                    ability to add semesters and courses inside of a degree
                    plan.
                </h5>
                <h5 style={{ paddingTop: "15px" }}>Getting Started:</h5>
                <h5 style={{ paddingTop: "15px" }}>
                    To get started, press the &quot;Add New Degree Plan&quot;
                    button to open up an overlay where you can populate a new
                    degree plan with semesters and courses.
                </h5>
                <h5 style={{ paddingTop: "15px" }}>
                    Once you are satisfied with your degree plan, hit the
                    &quot;Save Changes&quot; button to return to the main page
                    where you can then click on you newly created degree plan to
                    view it.
                </h5>
                <h5 style={{ paddingTop: "15px" }}>
                    You can create a new course by clicking the &quot;Add New
                    Course&quot; button.
                </h5>
                <h5 style={{ paddingTop: "15px" }}>
                    To edit or delete a course click &quot;Courses&quot; and
                    find the course you want to edit or delete.
                </h5>
            </div>
        </div>
    );
};
