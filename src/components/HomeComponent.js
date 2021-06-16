import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { baseUrl } from "../redux/baseUrl";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from 'react-animation-components';

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
          <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
          <CardImg src={`${baseUrl}/${item.image}`} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>

            {item.designation && (
              <CardSubtitle> {item.designation} </CardSubtitle>
            )}
            <CardText> {item.description} </CardText>
          </CardBody>
        </Card>
        </FadeTransform>
      </div>
    );
  }
};

function Home({ dish, dishLoading, dishErr, leader, leadersLoading, leadersErr, promotion, promotionsLoading, promotionsErr }) {
  return (
    <div className="container">
      <div className="row">
        <RenderCard
          item={dish}
          isLoading={dishLoading}
          err={dishErr}
        />
        <RenderCard item={promotion} isLoading={promotionsLoading}
          err={promotionsErr} /> 
        <RenderCard item={leader} isLoading={leadersLoading}
          err={leadersErr} />
      </div>
    </div>
  );
}

export default Home;
