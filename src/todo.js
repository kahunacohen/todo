import React, { Component } from 'react';

import rp from 'request-promise-native'


export class ToDo extends Component {
  API_URL = 'http://localhost:3001';

  constructor() {
    super();
    this.state = {
      items: []
    }
  }

  async getItems() {
    return [{ title: "Get a casket", done: true }];
  }
  async componentDidMount() {
    const items = await this.getItems();
    console.log(items);
    this.setState({ items: items });

  }
  /*
  -              <li className="list-group-item">
-                <span className="todo-title to-do">Buy groceries</span>
-              </li>
-              <li className="list-group-item">
-                <span className="todo-title to-do">Buy casket</span></li>
-              <li className="list-group-item">
-                <span className="todo-title to-do">Pay electric bill</span></li>
-              <li className="list-group-item">
-                <span className="todo-title to-do">Set mouse trap</span></li> 
*/
  render() {
    if (this.state.items.length > 0) {
      console.log(this.state.items);
      return (
        <div className="container">
          <div className="row">
            <div className="col-md">
              <h2>To Do List</h2>
              <ul className="list-group">
                {this.state.items.length > 0 ? 
                  this.state.items.map(item => {
                    return <li className="list-group-item">{item.title}</li>
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