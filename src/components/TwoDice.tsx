import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): JSX.Element {
    const [leftDie, leftDieState] = useState<number>(1);
    const [rightDie, rightDieState] = useState<number>(6);

    function rollLeft(): void {
        leftDieState(d6());
    }

    function rollRight(): void {
        rightDieState(d6());
    }

    return (
        <div>
            <span>
                <Button onClick={rollLeft}>Roll Left</Button>
            </span>
            <span data-testid="left-die">{leftDie}</span>
            <span>
                <Button onClick={rollRight}>Roll Right</Button>
            </span>
            <span data-testid="right-die">{rightDie}</span>
            {leftDie === 1 && rightDie === 1 ? (
                <p>Lose</p>
            ) : leftDie === rightDie ? (
                <p>Win</p>
            ) : null}
        </div>
    );
}
