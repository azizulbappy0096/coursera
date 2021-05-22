import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// components
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";

// redux
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  leaders: state.leaders,
  promotions: state.promotions,
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          promotion={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
        />
      );
    };

    const MenuPage = () => {
      return <Menu dishes={this.props.dishes} />;
    };

    const ContactPage = () => {
      return <Contact />;
    };

    const DishDetailPage = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === Number(match.params.dishId)
            )[0]
          }
          comments={this.props.comments.filter(
            (cmnt) => cmnt.dishId === Number(match.params.dishId)
          )}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

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

export default withRouter(connect(mapStateToProps)(Main));
