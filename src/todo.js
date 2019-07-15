import React, { Component } from 'react';

import rp from 'request-promise-native'


export class ToDo extends Component {
  API_URL = 'http://localhost:3001';

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  async getItems() {
    return JSON.parse(await rp.get(`${this.API_URL}/items`));
  }
  async componentDidMount() {
    const items = await this.getItems();
    console.log(items);
    this.setState({ items: items });

  }
  render() {
    if (this.state.items.length > 0) {
      console.log(this.state.items);
      const titleClasses = ['todo-title'];
      return (
        <div className="container">
          <div className="row">
          <div className="col col-md-3">
              <h2>Actions</h2>
              <ul id="actions">
                <li><button type="button" class="btn-sm btn-info">Add</button></li>
                <li><button type="button" class="btn-sm btn-success">Mark Done</button></li>
                <li><button type="button" class="btn-sm btn-secondary">Mark Undone</button></li>
                <li><button type="button" class="btn-sm btn-danger">Delete</button></li>
              </ul>
            </div>
            <div className="col col-md-9">
              <h2>To Do List</h2>
              <ul className="list-group form-check">
                {this.state.items.length > 0 ?
                  this.state.items.map(item => {
                    let doneBadge;
                    if (item.done) {
                      titleClasses.push('done');
                      doneBadge = <span class="badge badge-success">Done</span>;
                    } else { 
                      titleClasses.push('to-do'); 
                      doneBadge = null;
                    }
                    return <li key={item.id.toString()} className="list-group-item"><input className="form-check-input" type="checkbox"/><span className={titleClasses.join(' ')}>{item.title}</span>{doneBadge }</li>;
                  })
                  : <p>No items</p>}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}