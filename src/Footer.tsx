/* eslint-disable no-extra-parens */
import React from "react";

export const Footer = () => {
    return (
        <div className="footer_box">
            <div className="footer_title">
                <h3 style={{ paddingLeft: "10px" }}>
                    About CIS Degree Planner
                </h3>
            </div>
            <div className="footer_descr">
                <h6
                    style={{
                        wordSpacing: "5px",
                        lineHeight: "20px",
                        paddingBottom: "15px",
                        paddingLeft: "10px"
                    }}
                >
                    CIS Degree Planner aims to be a tool for University of
                    Delaware Computer Science students or prospects. The goal is
                    to help people interested in Computer Science at the
                    University of Delaware organize and plan their degree plan
                    by giving them a platform where they can brainstorm and
                    conceptualize different degree plans by filling them up with
                    semsesters and courses. We hope that this tool offers help
                    in shaping your degree plan.{" "}
                </h6>
            </div>
        </div>
    );
};
