/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Form, Row, Col, InputGroup, Modal } from "react-bootstrap";
import { Course } from "./interfaces/course";
import * as formik from "formik";
import * as yup from "yup";

export function AddCourseModal({
    show,
    handleClose,
    addCourse
}: {
    show: boolean;
    handleClose: () => void;
    addCourse: (newCourse: Course) => void;
}): JSX.Element {
    const [newCourse, setNewCourse] = useState<Course>({
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    });

    const { Formik } = formik;

    const schema = yup.object().shape({
        code: yup.string().required(),
        name: yup.string().required(),
        descr: yup.string(),
        credits: yup.string().required(),
        preReq: yup.string(),
        restrict: yup.string(),
        breadth: yup.string(),
        typ: yup.string()
    });

    useEffect(() => {
        if (newCourse.code !== "") {
            addCourse(newCourse);
            handleClose();
            // Reset newCourse after closing the modal
            setNewCourse({
                code: "",
                name: "",
                descr: "",
                credits: "",
                preReq: "",
                restrict: "",
                breadth: "",
                typ: ""
            });
        }
    }, [newCourse, handleClose]);

    return (
        <Modal show={show} onHide={handleClose} animation={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Add a Course</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        code: "",
                        name: "",
                        descr: "",
                        credits: "",
                        preReq: "",
                        restrict: "",
                        breadth: "",
                        typ: ""
                    }}
                    onSubmit={(values) => {
                        setNewCourse({
                            code: values.code,
                            name: values.name,
                            descr: values.descr,
                            credits: values.credits,
                            preReq: values.preReq,
                            restrict: values.restrict,
                            breadth: values.breadth,
                            typ: values.typ
                        });
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormikCode"
                                >
                                    <Form.Label>Course Code</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder="ENGL 365"
                                            name="code"
                                            value={values.code}
                                            onChange={handleChange}
                                            isInvalid={!!errors.code}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.code}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    controlId="validationFormikCredits"
                                >
                                    <Form.Label>Credits</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="credits"
                                        placeholder="3"
                                        value={values.credits}
                                        onChange={handleChange}
                                        isInvalid={!!errors.credits}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {errors.credits}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group
                                    as={Col}
                                    md="8"
                                    controlId="validationFormikName"
                                >
                                    <Form.Label>Course Name</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder="Studies in Literary Genres, Types and Movements"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="8"
                                    controlId="validationFormik02"
                                >
                                    <Form.Label>Prerequisites</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="preReq"
                                        placeholder="ENGL 110"
                                        value={values.preReq}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="8"
                                    controlId="validationFormik03"
                                >
                                    <Form.Label>Restrict</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="restrict"
                                        placeholder="May be taken up to three times when topics vary."
                                        value={values.restrict}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Group
                                as={Col}
                                md="8"
                                controlId="validationFormik04"
                            >
                                <Form.Label>Breadth</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="breadth"
                                    placeholder="University: Creative Arts and Humanities; A&S: GROUP A: A&S Creative Arts & Humanities"
                                    value={values.breadth}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md="8"
                                controlId="validationFormik05"
                            >
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Fall, Winter, Spring, and Summer"
                                    name="typ"
                                    value={values.typ}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                md="12"
                                controlId="validationFormik01"
                            >
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descr"
                                    placeholder="Study of selected topics in 20th century British, American and world literature, e.g., the contemporary epic novel, post-colonial writing and politics."
                                    value={values.descr}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button type="submit">Add Course</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
