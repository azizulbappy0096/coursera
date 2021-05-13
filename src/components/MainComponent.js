import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// utils
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

// components
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
    };
  }

  render() {
    const HomePage = () => {
      return <Home
        dish={this.state.dishes.filter(dish => dish.featured)[0]}
        leader={this.state.leaders.filter(leader => leader.featured)[0]}
        promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
      />;
    };

    const MenuPage = () => {
      return <Menu dishes={this.state.dishes} />;
    };

    const ContactPage = () => {
      return <Contact />;
    };

    const DishDetailPage = ({ match }) => {
      return <DishDetail 
        dish={this.state.dishes.filter(dish => dish.id === Number(match.params.dishId))[0]}
        comments={this.state.comments.filter(cmnt => cmnt.dishId === Number(match.params.dishId))}
      />
    }

    const AboutPage = () => {
      return <About
        leaders={this.state.leaders}
      />
    }

    return (
      <div className="">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/aboutus" component={AboutPage} />
          <Route exact path="/menu" component={MenuPage} />
          <Route exact path="/menu/:dishId" component={DishDetailPage} />
          <Route exact path="/contactus" component={ContactPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
