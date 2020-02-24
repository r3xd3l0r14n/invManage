import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import firebase from './Firebase'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('items')
    this.unsubscribe = null;
    this.state = {
      items: []
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      const { name, currStock, minStock } = doc.data();
      items.push({
        key: doc.id,
        doc,
        name,
        currStock,
        minStock
      })
    })
    this.setState({
      items
    })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }



  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Items LIST
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Add Item</Link></h4>
            <h4><Link to="/upload">Upload new CSV</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Current Stock</th>
                  <th>Minimum Stock</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item =>
                  <tr className={item.minStock > item.currStock ? 'hilite':''} key={item.key} >
                    <td><Link to={`/show/${item.key}`}>{item.name}</Link></td>
                    <td>{item.currStock}</td>
                    <td>{item.minStock}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

