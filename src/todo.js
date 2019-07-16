import React, { Component } from 'react';

import rp from 'request-promise-native'


export class ToDo extends Component {
  API_URL = 'http://localhost:3001';

  constructor(props) {
    super(props);
    this.actOnCheckboxes = this.setItems.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.handleMarkUndone = this.handleMarkUndone.bind(this);
    this.state = {
      items: []
    }
  }

  /**
   * Acts on all checked checkboxes.
   * @param {Function} cb - Callback function which takes the item ID as a parameter. 
   * @returns {Array} - An array of item IDs acted upon.
   */
  setItems(cb) {
    let ret = [];
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      if (checkbox.checked) {
        cb.call(this, checkbox.dataset.key);
        checkbox.checked = false;
        ret.push(parseInt(checkbox.dataset.key));
      }
    });
    return ret;
  }

  /**
   * Gets the list of TODO items.
   */
  async getItems() {
    return JSON.parse(await rp.get(`${this.API_URL}/items`));
  }
  async addItem(title) {
    if (title) {
      await rp.post({ url: `${this.API_URL}/items`, body: { title: title }, json: true });
      this.setState({ items: await this.getItems() });
    }
  }
  handleAddItem() {
    this.addItem(document.getElementById('add-title').value);
  }
  async deleteItem(id) {
    await rp.delete(`${this.API_URL}/items/${id}`);
    this.setState({ items: await this.getItems() });
  }
  handleDeleteItem(e) {
    this.setItems(this.deleteItem);
  }
  async markDone(id) {
    if (id) {
      await rp.patch({ url: `${this.API_URL}/items/${id}`, body: { done: true }, json: true });
      this.setState({ items: await this.getItems() });
    }
  }
  handleMarkDone() {
    this.setItems(this.markDone);
  }
  async markUndone(id) {
    if (id) {
      await rp.patch({ url: `${this.API_URL}/items/${id}`, body: { done: false }, json: true });
      this.setState({ items: await this.getItems() });
    }
  }
  handleMarkUndone() {
    this.setItems(this.markUndone);
  }
  async componentDidMount() {
    const items = await this.getItems();
    this.setState({ items: items });

  }
  render() {
    if (this.state.items.length > 0) {
      const titleClasses = ['todo-title'];
      return (
        <div className="container">
          <div className="row">
            <div className="col col-md-3">
              <h2>Actions</h2>
              <ul id="actions">
                <li><input type="text" id="add-title" /><button type="button" className="btn-sm btn-info" onClick={this.handleAddItem}>Add</button></li>
                <li><button type="button" className="btn-sm btn-success" onClick={this.handleMarkDone}>Mark Done</button></li>
                <li><button type="button" className="btn-sm btn-secondary" onClick={this.handleMarkUndone}>Mark Undone</button></li>
                <li><button type="button" className="btn-sm btn-danger" onClick={this.handleDeleteItem}>Delete</button></li>
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
                      doneBadge = <span className="badge badge-success">Done</span>;
                    } else {
                      titleClasses.push('to-do');
                      doneBadge = null;
                    }
                    return <li key={item.id} className="list-group-item"><input data-key={item.id} className="form-check-input" type="checkbox" /><span className={titleClasses.join(' ')}>{item.title}</span>{doneBadge}</li>;
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