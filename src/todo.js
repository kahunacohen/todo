import React, { Component } from 'react';

import Actions from './actions';
import TodoList from './todo-list';
import {addItem, deleteItem, getItems, markDone, markUndone} from './api';


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
    this.handleAddItem = this.handleAddItem.bind(this)
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
  async setItems(cb) {
    let ret = [];
    let promises = [];
    this.itemCheckboxes.forEach(async checkbox => {
      if (checkbox && checkbox.checked) {
        promises.push(cb.call(this, checkbox.dataset.key));
        checkbox.checked = false;
        ret.push(parseInt(checkbox.dataset.key));
      }
    });
    await Promise.all(promises);
    return ret;
  }
  async updateItems() {
    this.setState({ items: await getItems() });
  }
  async handleAddItem() {
    const addInp = this.addItemInput;
    await addItem(addInp.value);
    addInp.value = '';
    this.updateItems();
  }
  async handleDeleteItem() {
    await this.setItems(deleteItem);
    this.updateItems();
  }
  async handleMarkDone() {
    await this.setItems(markDone);
    this.updateItems();
  }
  async handleMarkUndone() {
    await this.setItems(markUndone);
    this.updateItems();
  }
  async componentDidMount() {
    const items = await getItems();
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