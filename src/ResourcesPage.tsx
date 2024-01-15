import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import blueHensImage from "./assets/blue_hens_logo.jpg";

interface Resource {
    id: number;
    title: string;
    description: string;
    link: string;
    imageUrl: string;
    category: string;
}

const resources: Resource[] = [
    {
        id: 1,
        title: "UD CIS Concentrations",
        description:
            "Need help learning more about concentration or paths? Find out more.",
        link: "https://ud-cis-teaching.github.io/student-guidance/",
        imageUrl: blueHensImage,
        category: "General Info"
    },
    {
        id: 2,
        title: "UD Course Search",
        description:
            "Interested in finding course details for current UD offerings? Discover more.",
        link: "https://udapps.nss.udel.edu/CoursesSearch/",
        imageUrl: blueHensImage,
        category: "Course Search"
    },
    {
        id: 3,
        title: "Computer Science at UD",
        description:
            "For comprehensive details on Computer Science at UD, click here to learn more.",
        link: "https://www.cis.udel.edu/academics/undergraduate-programs/",
        imageUrl: blueHensImage,
        category: "Course Search"
    }
];

export const ResourcesPage = () => {
    return (
        <Container className="resource-page">
            <h1
                style={{
                    marginBottom: "10px",
                    textAlign: "center"
                }}
            >
                Resources
            </h1>
            <Row>
                {resources.map((resource) => (
                    <Col key={resource.id} lg={4} className="mb-4">
                        <Card className={`resource-card ${resource.category}`}>
                            <Card.Img variant="top" src={resource.imageUrl} />
                            <Card.Body>
                                <Card.Title>{resource.title}</Card.Title>
                                <Card.Text>{resource.description}</Card.Text>
                                <Button
                                    variant="primary"
                                    href={resource.link}
                                    target="_blank"
                                    style={{ marginTop: "10px" }}
                                >
                                    Visit
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
