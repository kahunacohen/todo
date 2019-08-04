import api from "./api";
import React from "react";
import ToDo from "./todo";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";

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
    getItemsStub.onCall(0).returns([{ title: 'foo', id: 1 }]);
    getItemsStub.onCall(1).returns([{ title: 'foo', id: 1 }, { title: 'bar', id: 2 }]);
    sinon.replace(ToDo.prototype, 'getItems', getItemsStub);

    // We don't need addItem at all, so replace it with nothing.
    sinon.replace(ToDo.prototype, 'addItem', sinon.fake());

    const { container, debug, unmount, getByTestId } = render(<ToDo />);
    unmnt = unmount;

    // Enter a title in add text input.
    getByTestId('add-title').value = 'bar';

    // Simulate click on add button, waiting for dom to change.
    fireEvent.click(getByTestId('add-btn'));
    const mutation = await waitForDomChange({container});

    // Grab the new li elements and assert they are what we expect.
    const todoListDomNodes = mutation[0].target.querySelectorAll('li');
    expect(todoListDomNodes.length).toEqual(2);
    const [first, second] = todoListDomNodes;
    expect(first.textContent).toEqual('foo');
    expect(second.textContent).toEqual('bar');
    done();
  });
  // it("handles marking items as done",  done => {
  //   var stub = sinon.stub();
  //   stub.onCall(0).returns([{ title: 'foo', id: 1 }]);
  //   stub.onCall(1).returns([{ title: 'foo', id: 1, done: true }]);
  //   sinon.replace(ToDo.prototype, 'getItems', stub);
  //   fakeMarkDone();
  //   const { debug, unmount, getByTestId } = render(<ToDo />);
  //   unmnt = unmount;
  //   setTimeout(() => {
  //     fireEvent.click(getByTestId("checkbox-1"));
  //     fireEvent.click(getByTestId("mark-done"));
  //     setTimeout(() => {
  //       expect(getByTestId('done-badge')).toBeDefined();
  //       done();
  //     }, 250)
  //   }, 250);
  // });
  // it("handles marking items as undone", async done => {
  //   var stub = sinon.stub();
  //   stub.onCall(0).returns([{ title: 'foo', id: 1, done: true }]);
  //   stub.onCall(1).returns([{ title: 'foo', id: 1, done: false }]);
  //   sinon.replace(ToDo.prototype, 'getItems', stub);
  //   fakeMarkUndone();
  //   const { debug, unmount, getByTestId, getByText, container } = render(<ToDo />);
  //   unmnt = unmount;
  //   setTimeout(() => {
  //     fireEvent.click(getByTestId("checkbox-1"));
  //     fireEvent.click(getByTestId("mark-undone"));
  //     setTimeout(() => {
  //       let doneBadgeFound;
  //       try {
  //         getByText(/^Done$/);
  //         doneBadgeFound = true;
  //       } catch (e) {
  //         doneBadgeFound = false;
  //       } finally {
  //         expect(doneBadgeFound).toBe(false);
  //         done();
  //       }
  //     }, 250)
  //   }, 250);
  // });
});
