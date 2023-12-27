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
                    If you want to save your degree plans, make sure to hit the
                    &quot;Save Degree Plans&quot; button.
                </h5>
            </div>
            <div className="howtotext_savewarning">
                <Card bg="danger" text="light" body>
                    <h5>
                        Warning: Failing to hit the &quot;Save Degree
                        Plans&quot; button and exiting the page will rewrite all
                        of your changes back to the last save.
                    </h5>
                </Card>
            </div>
        </div>
    );
};
