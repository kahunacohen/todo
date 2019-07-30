import api from "./api";
import React from "react";
import ToDo from "./todo";
import { render, fireEvent } from "@testing-library/react";

import sinon from "sinon";

describe("Todo", () => {
  let div;
  let fakeGetItems = items => {
    const fake = sinon.fake(() =>
      new Promise(resolve => {
        resolve(items);
      }));
    sinon.replace(
      ToDo.prototype,
      "getItems",
      fake
    );
    return fake;
  };
  let fakeMarkDone = () => {
    let fake = sinon.fake(() => { return new Promise(resolve => { resolve(true); }) });
    sinon.replace(ToDo.prototype, 'markDone', fake);
    return fake;
  };
  let fakeMarkUndone = () => {
    let fake = sinon.fake(() => { return new Promise(resolve => { resolve(true); }) });
    sinon.replace(ToDo.prototype, 'markUndone', fake);
    return fake;
  };
  let unmnt;
  beforeEach(() => {
    div = document.createElement("div");
  });
  afterEach(() => {
    unmnt();
    sinon.restore();
  });
  it('loads items on render', async done => {
    const getItemsAPICall = fakeGetItems([{ title: 'foo', id: 1 }]);
    const { unmount } = render(<ToDo />);
    unmnt = unmount;
    setTimeout(() => {
      expect(getItemsAPICall.calledOnce).toBe(true);
      done();
    }, 250);
  });
  it("handles marking items as done", async done => {
    var stub = sinon.stub();
    stub.onCall(0).returns([{ title: 'foo', id: 1 }]);
    stub.onCall(1).returns([{ title: 'foo', id: 1, done: true }]);
    sinon.replace(ToDo.prototype, 'getItems', stub);
    fakeMarkDone();
    const { debug, unmount, getByTestId } = render(<ToDo />);
    unmnt = unmount;
    setTimeout(() => {
      fireEvent.click(getByTestId("checkbox-1"));
      fireEvent.click(getByTestId("mark-done"));
      setTimeout(() => {
        expect(getByTestId('done-badge')).toBeDefined();
        done();
      }, 250)
    }, 250);
  });
  it("handles marking items as undone", async done => {
    var stub = sinon.stub();
    stub.onCall(0).returns([{ title: 'foo', id: 1, done: true }]);
    stub.onCall(1).returns([{ title: 'foo', id: 1, done: false }]);
    sinon.replace(ToDo.prototype, 'getItems', stub);
    fakeMarkUndone();
    const { debug, unmount, getByTestId, getByText, container } = render(<ToDo />);
    unmnt = unmount;
    setTimeout(() => {
      fireEvent.click(getByTestId("checkbox-1"));
      fireEvent.click(getByTestId("mark-undone"));
      setTimeout(() => {
        let doneBadgeFound;
        try {
          getByText(/^Done$/);
          doneBadgeFound = true;
        } catch (e) {
          doneBadgeFound = false;
        } finally {
          expect(doneBadgeFound).toBe(false);
          done();
        }
      }, 250)
    }, 250);
  });
});
