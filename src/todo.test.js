import React from "react";
import ReactDOM from "react-dom";
import ToDo from "./todo";

import sinon from "sinon";

describe("Todo", () => {
  let div;
  beforeEach(() => {
    div = document.createElement("div");
  });
  it("fudge", done => {
    const toDo = ReactDOM.render(<ToDo />, div);
    const ct = ReactDOM.findDOMNode(toDo);
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);
      done();
    }, 100);
  });
});
