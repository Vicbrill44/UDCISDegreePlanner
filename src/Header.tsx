/* eslint-disable no-extra-parens */
import React from "react";
import blueHensImage from "./assets/ud_logo_sm.png";
import { Link } from "react-router-dom";

export const Header = ({ handClick }: { handClick: () => void }) => {
    return (
        <div className="header_box">
            <div className="header_container1">
                <div className="ud_logo">
                    <Link to={"/"}>
                        <img
                            src={blueHensImage}
                            alt="Valopedia's logo design image for a Valorant website"
                        />
                    </Link>
                </div>
            </div>

            <div className="header_container2">
                <div className="dplanner_tag_cont">
                    <h2>CS Degree Planner | University of Delaware</h2>
                </div>

                <div className="text_buttons_cont">
                    <div className="textboxes">
                        <div className="font_buttons_textboxes">
                            <a>
                                <h3 onClick={handClick}>Courses</h3>
                            </a>
                            <Link
                                to={"/resources"}
                                style={{ textDecoration: "none" }}
                            >
                                <h3>Resources</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
