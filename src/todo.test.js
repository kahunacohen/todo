import api from "./api";
import React from "react";
import ToDo from "./todo";
import {
  render,
  fireEvent,
  wait,
  waitForDomChange
} from "@testing-library/react";

import sinon from "sinon";

describe("Todo", () => {
  let div;
  let unmnt;
  beforeEach(() => {
    div = document.createElement("div");
  });
  afterEach(() => {
    sinon.restore();
    unmnt();
  });
  it("handles adding items", async done => {
    // Stub ToDo.getItems to return what it would if we had added an item.
    let getItemsStub = sinon.stub();
    getItemsStub.onCall(0).returns([{ title: "foo", id: 1 }]);
    getItemsStub
      .onCall(1)
      .returns([{ title: "foo", id: 1 }, { title: "bar", id: 2 }]);
    sinon.replace(ToDo.prototype, "getItems", getItemsStub);

    // We don't need addItem at all, so replace it with nothing.
    sinon.replace(ToDo.prototype, "addItem", sinon.fake());

    // Render the ToDo component. This returns an object with
    // a number of useful functions.
    const { container, debug, unmount, getByTestId } = render(<ToDo />);

    // In case there's a test failure, ensure the unmount function gets called
    // in afterEach fixture by setting an outer variable.
    unmnt = unmount;

    // Enter a title in add text input.
    getByTestId("add-title").value = "bar";

    // Simulate click on add button, waiting for dom to change.
    fireEvent.click(getByTestId("add-btn"));
    const mutation = await waitForDomChange({ container });

    // Grab the new li elements and assert they are what we expect.
    const todoListDomNodes = mutation[0].target.querySelectorAll("li");
    expect(todoListDomNodes.length).toEqual(2);
    const [first, second] = todoListDomNodes;
    expect(first.textContent).toEqual("foo");
    expect(second.textContent).toEqual("bar");
    done();
  });
  it("handles marking items as done", async done => {
    // Stub getItems to return a done item the second time it's called.
    let getItemsStub = sinon.stub();
    getItemsStub.onCall(0).returns([{ title: "foo", id: 1 }]);
    getItemsStub.onCall(1).returns([{ title: "foo", id: 1, done: true }]);
    sinon.replace(ToDo.prototype, "getItems", getItemsStub);

    // Stub out markDone to do nothing.
    sinon.replace(ToDo.prototype, "markDone", sinon.fake());
    const { unmount, getByTestId } = render(<ToDo />);
    unmnt = unmount;

    // Wait till the first item is rendered, and tick its checkbox.
    await wait(() => fireEvent.click(getByTestId("checkbox-1")));

    // Click the Done button.
    fireEvent.click(getByTestId("mark-done"));

    // Check we rendered a done badge.
    await wait(() => getByTestId("done-badge"));
    expect(getByTestId("done-badge")).toBeDefined();
    done();
  });
  it("handles marking items as undone", async done => {
    var getItemsStub = sinon.stub();
    getItemsStub.onCall(0).returns([{ title: "foo", id: 1, done: true }]);
    getItemsStub.onCall(1).returns([{ title: "foo", id: 1, done: false }]);
    sinon.replace(ToDo.prototype, "getItems", getItemsStub);
    sinon.replace(ToDo.prototype, "markUndone", sinon.fake());
    const { unmount, getByTestId, container } = render(<ToDo />);
    unmnt = unmount;
    await wait(() => getByTestId("checkbox-1") && getByTestId("mark-undone"));
    fireEvent.click(getByTestId("checkbox-1"));
    fireEvent.click(getByTestId("mark-undone"));
    const mutation = await waitForDomChange({ container });
    // Search DOM mutation for the done span. It shouldn't be there.
    mutation.forEach(change => {
      if (change.target.tagName === "SPAN") {
        expect(change.target.getAttribute("id")).not.toEqual("done-badge");
      }
    });
    done();
  });
  it("handles deleting items", async done => {
    var getItemsStub = sinon.stub();
    getItemsStub.onCall(0).returns([{ title: "foo", id: 1, done: true }]);
    getItemsStub.onCall(1).returns([]);
    sinon.replace(ToDo.prototype, "getItems", getItemsStub);
    sinon.replace(ToDo.prototype, "deleteItem", sinon.fake());
    const { unmount, getByTestId, getByText } = render(<ToDo />);
    unmnt = unmount;

    // Click the first item
    await wait(() => fireEvent.click(getByTestId("checkbox-1")));

    // Click the delete button and check that no items render.
    fireEvent.click(getByTestId("delete"));
    await wait(() => getByText("No items yet..."));
    expect(getByText("No items yet...")).toBeDefined();
    done();
  });
});
