import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): JSX.Element {
    const [isEditable, setEditable] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

    function updateIsStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setIsStudent(event.target.checked);
    }
    function updateEditable(event: React.ChangeEvent<HTMLInputElement>) {
        setEditable(event.target.checked);
    }

    const studentStatus = isStudent ? "a student" : "not a student";
    const nameDisplay = isEditable ? userName : "Your Name";
    const label = `${nameDisplay} is ${studentStatus}`;

    return (
        <div>
            <Form.Group controlId="formYourName">
                <Form.Label>Name:</Form.Label>
                <Form.Control value={userName} onChange={updateName} />
            </Form.Group>
            <Form.Check
                type="checkbox"
                id="is-student"
                label={"student"}
                checked={isStudent}
                onChange={updateIsStudent}
            />
            <Form.Check
                type="switch"
                id="is-editable"
                label="Edit?"
                checked={isEditable}
                onChange={updateEditable}
            />
            {label}
        </div>
    );
}
/*<Form.Group controlId="formYourName">
                <Form.Label>Name:</Form.Label>
                <Form.Control value={userName} onChange={updateName} />
            </Form.Group>
            <Form.Check
                type="checkbox"
                id="is-student"
                label={"student"}
                checked={isStudent}
                onChange={updateIsStudent}
            />
            <Form.Check
                type="switch"
                id="is-editable"
                label="Edit?"
                checked={isEditable}
                onChange={updateEditable}
            />
            {label}
            
    --------other version--------
    <Form.Check
                type="switch"
                id="is-editable"
                label="Edit?"
                checked={isEditable}
                onChange={updateEditable}
            />
            <Form.Check
                type="checkbox"
                id="is-student"
                label={"student"}
                checked={isStudent}
                onChange={updateIsStudent}
            />
            {!isEditable ? (
                `Your Name is ${isStudent ? "a student" : "not a student"}`
            ) : (
                <div>
                    <Form.Group controlId="formYourName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control value={userName} onChange={updateName} />
                    </Form.Group>
                    {`${userName} is ${
                        isStudent ? "a student" : "not a student"
                    }`}
                </div>
            )}
            
*/
