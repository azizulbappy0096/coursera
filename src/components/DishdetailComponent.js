import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// redux-form
import { Control, Errors, LocalForm } from "react-redux-form";

// ---- validators
const required = (val) => val;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

// render a dish
const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 mt-5 mx-auto">
        <Card>
          <CardImg width="100%" src={dish.image} atl={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

// render dish comments
function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 mt-5 mx-auto">
        <h4> Comments </h4>
        <ul className="list-unstyled">
          {comments.map((cmnt) => (
            <li key={cmnt.id} className="mb-4">
              <p className="m-0"> {cmnt.comment} </p>
              <small>
                {" "}
                -- {cmnt.author} ||{" "}
                {new Intl.DateTimeFormat("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(cmnt.date))}{" "}
              </small>
            </li>
          ))}
          <li>
            <CommentForm />
          </li>
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

// comment form for dish
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
    let go = JSON.stringify(val);
    alert(`User Comment: ${go}`);
    this.toggleModal();
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
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
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

// dishDetail component
const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row mt-2">
        <Breadcrumb className="w-100">
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3> {props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments} />
      </div>
    </div>
  );
};

export default DishDetail;
