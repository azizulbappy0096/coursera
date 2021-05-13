import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem } from "reactstrap";

const RenderMenuItem = ({ dish }) => {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} atl={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
};

const Menu = (props) => {
  let menu = props.dishes.map((dish) => (
    <div key={dish.id} className="col-12 col-md-5 mt-5 mx-auto">
      <RenderMenuItem dish={dish} />
    </div>
  ));

  return (
    <div className="container">
      <div className="row mt-2">
        <Breadcrumb className="w-100">
          <BreadcrumbItem>
            <Link to="/home">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
           Menu
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row menu">{menu}</div>
    </div>
  );
};

export default Menu;
