import React from "react";
import "./App.css";
import dog_image from "./assets/dog.jpg";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

function App(): JSX.Element {
    return (
        <div className="App">
            <h1>New Header</h1>
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
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
        </div>
    );
}

export default App;
