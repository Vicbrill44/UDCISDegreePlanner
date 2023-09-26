import React from "react";
import "./App.css";
<<<<<<< HEAD
import dog_image from "./assets/dog.jpg";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
=======
import { ChangeType } from "./components/ChangeType";
import { RevealAnswer } from "./components/RevealAnswer";
import { StartAttempt } from "./components/StartAttempt";
import { TwoDice } from "./components/TwoDice";
import { CycleHoliday } from "./components/CycleHoliday";
import { Counter } from "./components/Counter";
>>>>>>> upstream/task-state

function App(): JSX.Element {
    return (
        <div className="App">
            <h1>New Header</h1>
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
<<<<<<< HEAD
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
            <p>Victor Vasquez</p>
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World
            </Button>
            <p>Hello World</p>
            <img
                src={dog_image}
                alt="A picture of a dog"
                width="900"
                height="549"
            />
            <ul>
                <li>dog</li>
                <li>cat</li>
                <li>fish</li>
            </ul>
            <Container>
                <Row>
                    <Col>
                        <div className="filled-rect"></div>
                    </Col>
                    <Col>
                        <div className="filled-rect"></div>
                    </Col>
                </Row>
            </Container>
=======
            <hr></hr>
            <Counter></Counter>
            <hr />
            <RevealAnswer></RevealAnswer>
            <hr />
            <StartAttempt></StartAttempt>
            <hr />
            <TwoDice></TwoDice>
            <hr />
            <ChangeType></ChangeType>
            <hr />
            <CycleHoliday></CycleHoliday>
>>>>>>> upstream/task-state
        </div>
    );
}

export default App;
