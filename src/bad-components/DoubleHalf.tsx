import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface dhObject {
    setDhValue: (newValue: number) => void;
    value: number;
}

function Doubler({ setDhValue, value }: dhObject): JSX.Element {
    return <Button onClick={() => setDhValue(2 * value)}>Double</Button>;
}

function Halver({ setDhValue, value }: dhObject): JSX.Element {
    return <Button onClick={() => setDhValue(0.5 * value)}>Halve</Button>;
}

export function DoubleHalf(): JSX.Element {
    const [dhValue, setDhValue] = useState<number>(10);
    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{dhValue}</span>
            </div>
            <Doubler setDhValue={setDhValue} value={dhValue}></Doubler>
            <Halver setDhValue={setDhValue} value={dhValue}></Halver>
        </div>
    );
}
