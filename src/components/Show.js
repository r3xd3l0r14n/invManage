import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("items")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          item: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No Such Document!");
      }
    });
  }

  delete(key) {
    firebase.firestore().collection("items").doc(key)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch(error => {
        console.error("Error Removing Document:", error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="/">Item List</Link>
            </h4>
            <h3 className="panel-title">{this.state.item.name}</h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Item Name:</dt>
              <dd>{this.state.item.name}</dd>
              <dt>Current Stock:</dt>
              <dd>{this.state.item.currStock}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.key)}
              className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
