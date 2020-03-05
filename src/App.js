import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "./Firebase";
import "./App.css";
import MatTable from "./components/MatTable";
import Navbar from "./components/Navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("items");
    this.unsubscribe = null;
    this.state = {
      items: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const items = [];
    querySnapshot.forEach(doc => {
      const { name, currStock, minStock } = doc.data();
      items.push({
        key: doc.id,
        doc,
        name,
        currStock,
        minStock
      });
    });
    this.setState({
      items
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Navbar />
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create">Add Item</Link>
            </h4>
            <h4>
              <Link to="/upload">Upload new CSV</Link>
            </h4>
          </div>
        </div>
        <MatTable items={this.state.items} />
      </div>
    );
  }
}

export default App;
