import React, { Component, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
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
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

// redux
import { connect } from "react-redux";

import { fetchComments } from "../redux/ActionCreators"

// redux-form
import { Control, Errors, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../redux/baseUrl";

// ---- validators
const required = (val) => val;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;

// render a dish
const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 mt-5 mx-auto">
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
          <CardImg
            width="100%"
            src={baseUrl + "/" + dish.image}
            atl={dish.name}
          />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
        </FadeTransform>
      </div>
    );
  } else {
    return <div></div>;
  }
};

// render dish comments
function RenderComments({ comments, dishId, postComment }) {

    return (
      <div className="col-12 col-md-5 mt-5 mx-auto">
        <h4> Comments </h4>
        <ul className="list-unstyled">
        <Stagger in>
        
          {comments?.map((cmnt) => (
            <Fade in>
            <li key={cmnt._id} className="mb-4">
              <p className="m-0"> {cmnt.comment} </p>
              <small>
                {" "}
                -- {cmnt.author.username} ||{" "}
                {new Intl.DateTimeFormat("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(cmnt.createdAt))}{" "}
              </small>
            </li>
            </Fade>
          ))}
          <Fade in>
          <li>
            <CommentForm dishId={dishId} postComment={postComment} />
          </li>
          </Fade>
          </Stagger>
        </ul>
      </div>
    );
  
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
    this.props.postComment(
      this.props.dishId,
      val.rating,
      val.comment
    );
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
                <Control.select // eslint-disable-line
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
                <Label for="author"> Your Name </Label>
                <Control
                type="text"
                  model=".author"
                  id="author"
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
                  model=".author"
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
                <Control.textarea // eslint-disable-line
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
// const mapStateToProps = (state) => ({
//   comments: state.comments
// });

// const mapDispatchToProps = dispatch => ({
//   fetchComments: (dishId) => dispatch(fetchComments(dishId)),
// })

const DishDetail = (props) => {

  if (props.isLoading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishErr != null) {
    return <h1> {props.dishErr} </h1>;
  } else {
    return (
      <div className="container">
        {console.log("from dishdetail",props)}
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
          <RenderComments
          comments={props.dish.comments}
            dishId={props.dish._id}
            postComment={props.postComment}
          />
        </div>
      </div>
    );
  }
};

export default DishDetail;
