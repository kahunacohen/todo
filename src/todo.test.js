import api from './api';
import React from "react";
import ReactDOM from "react-dom";
import ToDo from "./todo";

import sinon from "sinon";


describe("Todo", () => {
  let div;
  beforeEach(() => {
    div = document.createElement("div");
    sinon.replace(api, 'getItems', sinon.fake(() => [{ title: 'foo', id: 1 }]));
  });
  afterEach(() => {
    sinon.restore();
  })
  it("fudge", async done => {
    const toDo = ReactDOM.render(<ToDo />, div);
    const ct = ReactDOM.findDOMNode(toDo);
    setTimeout(() => {
      const itemCheckBox = ct.querySelector('input[data-key="1"]');
      itemCheckBox.checked = true;
      ReactDOM.unmountComponentAtNode(div);
      done();
    }, 100);
  });
});
