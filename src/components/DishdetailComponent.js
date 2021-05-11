import React, { Component } from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

export class DishDetail extends Component {
    constructor(props) {
        super(props)
    }

    renderDish(dish) {
        if (dish != null) {
          return (
            <div className="col-12 col-md-5 mt-5">
                <Card>
              <CardImg width="100%" src={dish.image} atl={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
            </div>
          );
        } else {
          return <div></div>;
        }
      }

      renderComments(comments) {
        if (comments != null) {
            return (
              <div className="col-12 col-md-5 mt-5">
                  <h4> Comments </h4>
                  <ul className="list-unstyled">
                  {comments.map(cmnt => (
                      <li key={cmnt.id} className="mb-4">
                          <p className="m-0"> {cmnt.comment} </p>
                      <small> -- {cmnt.author}, {cmnt.date} </small>
                      </li>
                  ))}
                  </ul>
              </div>
            );
          } else {
            return <div></div>;
          }
      }

    render() {
        return (
            <div className="row">
                {this.renderDish(this.props.selectedDish)}
                {this.renderComments(this.props.selectedDish?.comments)}
            </div>
        )
    }
}

export default DishDetail
