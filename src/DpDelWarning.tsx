/* eslint-disable indent */
/* eslint-disable no-extra-parens */
import React from "react";
import "./App.css";
import { Button, Modal } from "react-bootstrap";

export function DpDelWarningModal({
    show,
    handleClose,
    deleteDp
}: {
    show: boolean;
    handleClose: () => void;
    deleteDp: () => void;
}): JSX.Element {
    const handleCloseModal = () => {
        handleClose();
    };
    const handleDeleteDp = () => {
        deleteDp();
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>
                            Are you sure you want to delete the degree plan?
                        </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleDeleteDp}>
                        Yes
                    </Button>
                    <Button variant="warning" onClick={handleCloseModal}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
