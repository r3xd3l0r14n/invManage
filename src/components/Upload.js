import React, { Component } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";
import firebase from "../Firebase";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("items");
    this.unsubscribe = null;
    this._isMounted = false;
    this.state = {
      csvfile: undefined,
      items: []
    };
    this.updateData = this.updateData.bind(this);
    this.purgeUpdate = this.purgeUpdate.bind(this)
  }



  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0]
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;

    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true
    });
  };

  purgeUploadCSV = () => {
    const { csvfile } = this.state;

    Papa.parse(csvfile, {
      complete: this.purgeUpdate,
      header: true
    })
  }

  onCollectionPull = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach(doc => {
      const { name, currStock, minStock, barcode } = doc.data();
      items.push({
        key: doc.id,
        doc,
        name,
        currStock,
        minStock,
        barcode
      });
    });
    if (this._isMounted){
      this.setState({
        items
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionPull);

  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  updateData(result) {
    var data = result.data;
    const item = this.state.items;
    
  }

  purgeUpdate(result) {
    console.log('here')
    var data = result.data;
    const item = this.state.items
    
    item.forEach((d)=>{
      this.ref.doc(d.key).delete()
      .then(()=>{
        console.log("Document successfully deleted!")
      })
      .catch(err => {
        console.error("Error removing document: ", err)
      })
    })
    data.forEach((d)=>{
      const { name, currStock, minStock, barcode } = d

      this.ref.add({
        name,
        currStock,
        minStock,
        barcode
      })
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
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
              <input
                className="btn btn-primary"
                type="file"
                ref={input => {
                  this.filesInput = input;
                }}
                name="file"
                placeholder={null}
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary" onClick={this.importCSV}>
              Upload to Update Does nto Currently Do anything!!
            </button>
            <br />
            <button className="btn btn-primary" onClick={this.purgeUploadCSV}>
              Purge and Upload new Collection
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
