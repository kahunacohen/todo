import React from "react";
import ReactDOM from "react-dom";
import Actions from "./actions";

describe("Actions", () => {
  let div;
  beforeEach(() => {
    div = document.createElement("div");
  });
  it("renders list items with proper action buttons", () => {
    const actions = ReactDOM.render(<Actions id="1" key="1" />, div);
    const ct = ReactDOM.findDOMNode(actions);
    const [add, done, undone, del] = ct.querySelectorAll('li button');
    expect(add.textContent).toEqual('Add');
    expect(done.textContent).toEqual('Mark Done');
    expect(undone.textContent).toEqual('Mark Undone');
    expect(del.textContent).toEqual('Delete');
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders an input sibling to add action button", () => {
    const actions = ReactDOM.render(<Actions id="1" key="1" />, div);
    const ct = ReactDOM.findDOMNode(actions);
    const input = ct.querySelector('li:first-child input');
    expect(input.type).toEqual('text');
    ReactDOM.unmountComponentAtNode(div);
  });
});
