import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";

// components
import CommentForm from "./CommentFormComponent";

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
