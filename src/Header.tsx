/* eslint-disable no-extra-parens */
import React from "react";
import blueHensImage from "./assets/ud_logo_sm.png";

export const Header = () => {
    return (
        <div className="header_box">
            <div className="header_container1">
                <div className="ud_logo">
                    <a>
                        <img
                            src={blueHensImage}
                            alt="Valopedia's logo design image for a Valorant website"
                        />
                    </a>
                </div>
            </div>

            <div className="header_container2">
                <div className="dplanner_tag_cont">
                    <h2>CS Degree Planner | University of Delaware</h2>
                </div>

                <div className="text_buttons_cont">
                    <div className="textboxes">
                        <div className="font_buttons_textboxes">
                            <div className="courses_text">
                                <a href="news.html">Courses</a>
                            </div>
                            <div className="resources_text">
                                <a href="events.html">Resources</a>
                            </div>
                            <div className="about_text">
                                <a href="matches.html">About</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
