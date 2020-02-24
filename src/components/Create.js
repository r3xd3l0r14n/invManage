import React, { Component } from 'react';
import firebase from '../Firebase'
import { Link } from 'react-router-dom'

class Create extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('items')
        this.state = {
            name: '',
            currStock: 0,
            minStock: 0
        }
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {name,currStock,minStock} = this.state

        this.ref.add({
            name,
            currStock,
            minStock
        }).then((docRef) => {
            this.setState({
                name: '',
                currStock: 0,
                minStock: 0
            })
        })
        .catch((error)=>{
            console.error("Error Adding Document:", error)
        })
    }

    render() {
        const { name, currStock, minStock } = this.state
        return (
            <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Add Item
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Item List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div className="form-group">
                <label>Current Stock:</label>
            <textarea className="form-control" name="currStock" onChange={this.onChange} placeholder="0" cols="80" rows="3" value={currStock} />
              </div>
              <div className="form-group">
                <label>Minimum Stock:</label>
            <textarea className="form-control" name="minStock" onChange={this.onChange} placeholder="0" value={minStock} />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
        );
    }
}

export default Create;