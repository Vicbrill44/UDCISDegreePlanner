import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): JSX.Element {
    const [visibleAnswer, setVisibility] = useState<boolean>(false);
    return (
        <span>
            <Button onClick={() => setVisibility(!visibleAnswer)}>
                Reveal Answer
            </Button>
            {visibleAnswer && <p>42</p>}
        </span>
    );
}
