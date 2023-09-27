import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [quiz, setQuiz] = useState<boolean>(false);

    function increaseAttempts(): void {
        setAttempts(attempts + 1);
    }

    function decreaseAttempts(): void {
        setAttempts(attempts - 1);
    }

    return (
        <span>
            <Button
                onClick={() => {
                    decreaseAttempts();
                    setQuiz(true);
                }}
                disabled={quiz || attempts === 0}
            >
                Start Quiz
            </Button>
            <Button onClick={() => setQuiz(false)} disabled={!quiz}>
                Stop Quiz
            </Button>
            <Button onClick={increaseAttempts} disabled={quiz}>
                Mulligan
            </Button>
            <p>{attempts}</p>
        </span>
    );
}
