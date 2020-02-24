import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      currStock: 0,
      minStock: 0
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("items")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const item = doc.data();
        this.setState({
          key: doc.id,
          name: item.name,
          currStock: item.currStock,
          minStock: item.minStock
        });
      } else {
        console.log("No Such Document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ item: state });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, currStock, minStock } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("items")
      .doc(this.state.key);

    updateRef
      .set({
        name,
        currStock,
        minStock
      })
      .then(docRef => {
        this.setState({
          key: "",
          name: "",
          currStock: 0,
          minStock: 0
        });
      })
      .catch(error => {
        console.error("Error Adding Document: ", error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Edit Board</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to={`/`} className="btn btn-primary">
                Item List
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label>Current Stock:</label>
                <input
                  type="text"
                  className="form-control"
                  name="currStock"
                  value={this.state.currStock}
                  onChange={this.onChange}
                  placeholder="currStock"
                />
              </div>
              <div className="form-group">
                <label>Minimum Stock:</label>
                <input
                  type="text"
                  className="form-control"
                  name="minStock"
                  value={this.state.minStock}
                  onChange={this.onChange}
                  placeholder="minStock"
                />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
