import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";

const RenderCard = ({ item, isLoading, err }) => {
  if (isLoading) {
    return (
   
      <Loading addClass="align-self-center" />
    
  
    );
  } else if (err != null) {
    return <h1> {err} </h1>;
  } else {
    return (
      <div className="col-12 col-md m-1">
        <Card>
          <CardImg src={item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>

            {item.designation && (
              <CardSubtitle> {item.designation} </CardSubtitle>
            )}
            <CardText> {item.description} </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
};

function Home({ dish,dishLoading, dishErr, leader, promotion }) {
  return (
    <div className="container">
      <div className="row">
        <RenderCard
          item={dish}
          isLoading={dishLoading}
          err={dishErr}
        />
        <RenderCard item={promotion} />
        <RenderCard item={leader} />
      </div>
    </div>
  );
}

export default Home;
