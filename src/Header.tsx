/* eslint-disable no-extra-parens */
import React from "react";
import blueHensImage from "./assets/ud_logo_sm.png";

export const Header = ({ handClick }: { handClick: () => void }) => {
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
                            <a>
                                <h3 onClick={handClick}>Course</h3>
                            </a>
                            <a>
                                <h3>Resources</h3>
                            </a>
                            <a>
                                <h3>About</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
