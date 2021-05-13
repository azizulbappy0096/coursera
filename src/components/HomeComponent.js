import React from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";

const RenderCard = ({ item }) => {
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
};

function Home({ dish, leader, promotion }) {
  return (
    <div className="container">
      <div className="row">
        <RenderCard item={dish} />
        <RenderCard item={promotion} />
        <RenderCard item={leader} />
        
      </div>
    </div>
  );
}

export default Home;
