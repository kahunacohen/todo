import React from "react";
import ReactDOM from "react-dom";
import sinon from 'sinon';

import api from './api';
import ItemList from "./item-list";

describe("ItemList", () => {
  let div;
  beforeEach(() => {
    div = document.createElement("div");
  });
  afterEach(() => {
  })

  it("renders list items for each todo item", () => {
    const itemList = ReactDOM.render(
      <ItemList items={[{ id: 1, title: "foo" }, { id: 2, title: "bar"}]} />,
      div
    );
    const ct = ReactDOM.findDOMNode(itemList);
    const listItems = ct.querySelectorAll("li");
    expect(listItems.length).toBe(2);
    ReactDOM.unmountComponentAtNode(div);
  });
});
