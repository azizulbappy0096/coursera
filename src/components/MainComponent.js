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

// react transition
import {
CSSTransition,
TransitionGroup
} from 'react-transition-group';

// redux
import { connect } from "react-redux";

// actions
import { postComment, fetchDishes, fetchComments, fetchPromotions, fetchLeaders } from "../redux/ActionCreators"
import { actions } from "react-redux-form"

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  leaders: state.leaders,
  promotions: state.promotions,
});

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch((dispatch) => {
    postComment(dispatch, dishId, rating, author, comment)
  }),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromotions: () => dispatch(fetchPromotions()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm: () => dispatch(actions.reset("feedback"))
})

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromotions()
    this.props.fetchLeaders()
  }

  render() {
    const HomePage = () => {
      return (
        <Home
        dishLoading={this.props.dishes.isLoading}
          dishErr={this.props.dishes.error}
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErr={this.props.leaders.error}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          promotionsLoading={this.props.promotions.isLoading}
          promotionsErr={this.props.promotions.error}
          promotion={
            this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]
          }
          
        />
      );
    };

    const MenuPage = () => {
      return <Menu dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading}
      err={this.props.dishes.error} />;
    };

    const ContactPage = () => {
      return <Contact resetFeedbackForm={this.props.resetFeedbackForm} />;
    };

    const DishDetailPage = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === Number(match.params.dishId)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          dishErr={this.props.dishes.error}
          comments={this.props.comments.comments.filter(
            (cmnt) => cmnt.dishId === Number(match.params.dishId)
          )}
          commentsErr={this.props.comments.error}
          postComment={this.props.postComment}
        />
      );
    };

    const AboutPage = () => {
      return <About leadersLoading={this.props.leaders.isLoading}
      leadersErr={this.props.leaders.error} leaders={this.props.leaders.leaders} />;
    };

    return (
      <div className="">
        <Header />
       <TransitionGroup>
         <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
         <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/aboutus" component={AboutPage} />
          <Route exact path="/menu" component={MenuPage} />
          <Route exact path="/menu/:dishId" component={DishDetailPage} />
          <Route exact path="/contactus" component={ContactPage} />
          <Redirect to="/home" />
        </Switch>
        </CSSTransition>
       </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
