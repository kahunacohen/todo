import React, { Component } from 'react';
import rp from 'request-promise-native'

import Actions from './actions';
import TodoList from './todo-list';


export class ToDo extends Component {
  API_URL = 'http://localhost:3001';

  constructor(props) {
    super(props);
    this.addItemInput = null;
    this.setAddInput = this.setAddInput.bind(this);
    this.itemCheckboxes = [];
    this.state = {
      items: []
    }
    this.setItemCheckboxesRef = this.setItemCheckboxesRef.bind(this);
    this.setItems = this.setItems.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleMarkDone = this.handleMarkDone.bind(this);
    this.handleMarkUndone = this.handleMarkUndone.bind(this);
  }
  setAddInput(el) {
    this.addItemInput = el;
  }
  setItemCheckboxesRef(el) {
    this.itemCheckboxes.push(el);
  }

  /**
   * Acts on all checked checkboxes.
   * @param {Function} cb - Callback function which takes the item ID as a parameter. 
   * @returns {Array} - An array of item IDs acted upon.
   */
  setItems(cb) {
    let ret = [];
    this.itemCheckboxes.forEach(checkbox => {
      if (checkbox && checkbox.checked) {
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
  async handleAddItem() {
    const addInp = this.addItemInput;
    await this.addItem(addInp.value);
    addInp.value = '';
  }
  async deleteItem(id) {
    await rp.delete(`${this.API_URL}/items/${id}`);
    this.setState({ items: await this.getItems() });
  }
  handleDeleteItem(e) {
    this.setItems(this.deleteItem);
  }
  async markDone(id) {
    console.log(id);
    if (id) {
      await rp.patch({ url: `${this.API_URL}/items/${id}`, body: { done: true }, json: true });
      this.setState({ items: await this.getItems() });
    }
  }
  handleMarkDone() {
    console.log('here')
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
    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-3">
            <Actions
              setAddInput={this.setAddInput}
              handleAddItem={this.handleAddItem}
              handleMarkDone={this.handleMarkDone}
              handleMarkUndone={this.handleMarkUndone}
              handleDeleteItem={this.handleDeleteItem}/>
          </div>
          <div className="col col-md-9">
            <TodoList
              items={this.state.items}
              setItemCheckboxesRef={this.setItemCheckboxesRef}/>
          </div>
        </div>
      </div>
    );

  }
}