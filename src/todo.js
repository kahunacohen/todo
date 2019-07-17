import React, { Component } from 'react';

import API from './api';
import Actions from './actions';
import TodoList from './todo-list';


export class ToDo extends Component {

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
    this.api = new API();
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
  async setItems(cb) {
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
  async updateItemState() {
    //console.log(await this.api.getItems());
    this.setState({ items: await this.api.getItems() });
  }
  async handleAddItem() {
    const addInp = this.addItemInput;
    await this.api.addItem(addInp.value);
    addInp.value = '';
    this.updateItemState();
  }
  async handleDeleteItem(e) {
    this.setItems(this.api.deleteItem);
    this.updateItemState();
  }
  async handleMarkDone() {
    await this.setItems(this.api.setDone);
    this.updateItemState();
  }
  async handleMarkUndone() {
    await this.setItems(this.api.setUndone);
    this.updateItemState();
  }
  async componentDidMount() {
    const items = await this.api.getItems();
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