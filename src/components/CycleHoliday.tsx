import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    type Holiday = "🎃" | "🎄" | "🎉" | "🍹" | "☘️";

    const [holiday, setHoliday] = useState<Holiday>("🎃");

    const holidayAlphabet: Record<Holiday, Holiday> = {
        "🎄": "🍹",
        "🍹": "🎃",
        "🎃": "🎉",
        "🎉": "☘️",
        "☘️": "🎄"
    };

    const holidayTime: Record<Holiday, Holiday> = {
        "☘️": "🍹",
        "🍹": "🎃",
        "🎃": "🎄",
        "🎄": "🎉",
        "🎉": "☘️"
    };

    function alphabetSwitch(): void {
        const switchHoliday = holidayAlphabet[holiday];
        setHoliday(switchHoliday);
    }

    function timeSwitch(): void {
        const switchHoliday = holidayTime[holiday];
        setHoliday(switchHoliday);
    }

    return (
        <span>
            <Button onClick={alphabetSwitch}>Alphabet Switch</Button>
            <Button onClick={timeSwitch}>Year Switch</Button>
            {<p>Holiday: {holiday}</p>}
        </span>
    );
}
