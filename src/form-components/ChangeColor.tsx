import React, { useState } from "react";
import { Form } from "react-bootstrap";
const COLORS: string[] = [
    "blue",
    "red",
    "green",
    "yellow",
    "cyan",
    "pink",
    "orange",
    "purple"
];
const DEFAULT_COLOR: string = COLORS[0];

export function ChangeColor(): JSX.Element {
    const [currentColor, setCurrentColor] = useState<string>(DEFAULT_COLOR);

    function updateColor(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentColor(event.target.value);
    }
    return (
        <div>
            {COLORS.map((color: string) => (
                <Form.Check
                    key={color}
                    inline
                    type="radio"
                    name="color"
                    onChange={updateColor}
                    id="colored_buttons"
                    label={color}
                    value={color}
                    checked={currentColor === color}
                    style={{
                        backgroundColor: color,
                        color: "white",
                        margin: "5px",
                        borderRadius: "5px"
                    }}
                ></Form.Check>
            ))}
            <p>The current color is: </p>
            <p
                data-testid="colored-box"
                style={{ backgroundColor: currentColor }}
            >
                {currentColor}
            </p>
        </div>
    );
}
