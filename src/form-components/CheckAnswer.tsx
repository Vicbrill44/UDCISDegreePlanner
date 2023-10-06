import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [givenAnswer, setGivenAnswer] = useState<string>("");
    function updateGivenAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        setGivenAnswer(event.target.value);
    }
    return (
        <div>
            <Form.Group controlId="formQuizAnswer" as={Row}>
                <Form.Label column sm={2}>
                    Expected Answer:
                </Form.Label>
                <Col>
                    <Form.Control
                        value={givenAnswer}
                        onChange={updateGivenAnswer}
                    ></Form.Control>
                </Col>
                <Col>{givenAnswer === expectedAnswer ? "✔️" : "❌"}</Col>
            </Form.Group>
        </div>
    );
}
