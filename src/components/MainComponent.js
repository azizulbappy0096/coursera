import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"

// utils
import { DISHES } from "../shared/dishes";

// components
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }



  render() {

    const HomePage = () => {
        return <Home />
    }

    const MenuPage = () => {
        return <Menu dishes={this.state.dishes} />
    }

    return (
      <div className="">
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={MenuPage} />
            <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;
