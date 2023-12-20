/* eslint-disable no-extra-parens */
//todo: create a search dropdown where the user can click on a search bar and type in it while a dropdown gives you suggestions of courses
//      This will take the place of the current dropdown we have.
//      todo: first thing we need to do is bring in the full json data of all the classes and make them work within the existing site

import React from "react";
import { Card } from "react-bootstrap";
import { DegreePlan } from "./interfaces/degreeplan";

export const DpCard = ({
    dp,
    handleClick
}: {
    dp: DegreePlan[];
    handleClick: (quizId: number) => void;
}) => {
    return (
        <div>
            {dp.map((dp: DegreePlan) => (
                <div
                    key={dp.id}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Card text="light" bg="primary" style={{ width: "25rem" }}>
                        <Card.Body>
                            <Card.Title onClick={() => handleClick(dp.id)}>
                                {dp.title}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};
