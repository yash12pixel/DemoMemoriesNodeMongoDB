import React from "react";
import { Modal } from "react-bootstrap";
import CheckCircle from "@material-ui/icons/CheckCircle";
import { Button, Typography } from "@mui/material";
import "./style.scss";

const SuccessModal = (props) => {
  return (
    <Modal
      dialogClassName="SuccessAlert text-center"
      show={props.showModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <CheckCircle />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          overflow: "hidden",
          paddingLeft: "2px",
        }}>
        <Typography variant="subtitle1">{props.msg}</Typography>
        <Button
          type="submit"
          className="btn btn-secondary Cancel"
          variant="contained"
          onClick={props.onCloseModal}>
          {props.btnText}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

SuccessModal.defaultProps = {
  btnText: "Close",
};

export default SuccessModal;
