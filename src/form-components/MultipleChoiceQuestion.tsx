import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer
}: {
    options: string[];
    expectedAnswer: string;
}): JSX.Element {
    const [currentAnswer, setCurrentAnswer] = useState<string>(options[0]);
    function updateAnswer(event: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentAnswer(event.target.value);
    }
    return (
        <div>
            <Form.Group controlId="favoriteColors">
                <Form.Label>What is the answer: </Form.Label>
                <Form.Select value={currentAnswer} onChange={updateAnswer}>
                    {options.map((answer: string) => (
                        <option key={answer} value={answer}>
                            {answer}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {currentAnswer === expectedAnswer ? "✔️" : "❌"}
        </div>
    );
}
