import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface RevealRequestButtonProps {
    setAttemptsLeft: (newAttemptsLeft: string) => void;
    requestedAttempts: string;
    attemptsLeft: string;
}
function RequestedAttemptButton({
    setAttemptsLeft,
    requestedAttempts,
    attemptsLeft
}: RevealRequestButtonProps): JSX.Element {
    //make them integers and add them
    const requestedAttemptstoNum: number = parseInt(requestedAttempts, 10) || 0;
    const addedAttempts: number =
        requestedAttemptstoNum + parseInt(attemptsLeft, 10);
    return (
        <Button onClick={() => setAttemptsLeft(`${addedAttempts}`)}>
            gain
        </Button>
    );
}
interface RevealUseButtonProps {
    setAttemptsLeft: (newAttemptsLeft: string) => void;
    attemptsLeft: string;
}
function UseButton({
    setAttemptsLeft,
    attemptsLeft
}: RevealUseButtonProps): JSX.Element {
    return (
        <Button
            onClick={() => setAttemptsLeft(`${parseInt(attemptsLeft, 10) - 1}`)}
            disabled={parseInt(attemptsLeft, 10) === 0}
        >
            use
        </Button>
    );
}

export function GiveAttempts(): JSX.Element {
    const [attemptsLeft, setAttemptsLeft] = useState<string>("3");
    const [requestedAttempts, setRequestedAttempts] = useState<string>("");

    function updateAttemptsLeft(event: React.ChangeEvent<HTMLInputElement>) {
        setAttemptsLeft(event.target.value);
    }
    function updateRequestedAttempts(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setRequestedAttempts(event.target.value);
    }

    return (
        <div>
            <div>Number of attempts left: {attemptsLeft}</div>
            <Form.Group controlId="formRequestedAttempts">
                <Form.Label>Requested Attempts: </Form.Label>
                <Form.Control
                    type="number"
                    value={requestedAttempts}
                    onChange={updateRequestedAttempts}
                ></Form.Control>
            </Form.Group>
            <RequestedAttemptButton
                setAttemptsLeft={setAttemptsLeft}
                requestedAttempts={requestedAttempts}
                attemptsLeft={attemptsLeft}
            ></RequestedAttemptButton>
            <UseButton
                setAttemptsLeft={setAttemptsLeft}
                attemptsLeft={attemptsLeft}
            ></UseButton>
        </div>
    );
}
