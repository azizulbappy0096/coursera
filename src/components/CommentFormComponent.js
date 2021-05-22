import React, { Component } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

// redux-form
import { Control, Errors, LocalForm } from "react-redux-form";

// ---- validators
const required = val => val
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleSubmit(val) {
    let go = JSON.stringify(val)
    alert(`User Comment: ${go}`)
    this.toggleModal()
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil mr-2"></span>
          Submit Comment
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(val) => this.handleSubmit(val)}>
              <div className="form-group">
                <Label for="rating"> Rating </Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  defaultValue="1"
                  className="form-control"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label for="name"> Your Name </Label>
                <Control.text
                  model=".name"
                  id="name"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                  }}
                />
                <Errors
                className="text-danger"
                model=".name"
                show="touched"
                messages={{
                  required: 'Required',
                  minLength: 'Must be greater than 2 characters',
                  maxLength: 'Must be 15 characters or less'
                }}
                />
              </div>
              <div className="form-group">
                <Label for="comment"> Comment </Label>
                <Control.textarea
                  rows="6"
                  model=".comment"
                  id="comment"
                  className="form-control"
                />
              </div>
              <Button type="submit" color="primary">
                {" "}
                Submit{" "}
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default CommentForm;
