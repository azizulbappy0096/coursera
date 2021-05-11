import React from "react";
import {
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
} from "reactstrap";

const RenderMenuItem = ({ dish, onClick }) => {
  return(
    <Card onClick={() => onClick(dish.id)}>
          <CardImg width="100%" src={dish.image} atl={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
  )
}


const Menu = (props) => {
    let menu = props.dishes.map((dish) => (
      <div key={dish.id} className="col-12 col-md-5 mt-5 mx-auto">
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    ));
    return (
      <div className="container">
        <div className="row">{menu}</div>
      </div>
    );

}

export default Menu;
