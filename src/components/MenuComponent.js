import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardImg,
  CardImgOverlay,
  CardBody,
} from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({
      selectedDish: dish,
    });
  }



  render() {
    let menu = this.props.dishes.map((dish) => (
      <div key={dish.id} className="col-12 col-md-5 mt-5">
        <Card onClick={() => this.onDishSelect(dish)}>
          <CardImg width="100%" src={dish.image} atl={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    ));
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <DishDetail selectedDish={this.state.selectedDish} />
      </div>
    );
  }
}

export default Menu;
