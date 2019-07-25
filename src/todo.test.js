import api from "./api";
import React from "react";
import ToDo from "./todo";
import { render, fireEvent } from "@testing-library/react";

import sinon from "sinon";

describe("Todo", () => {
  let div;
  let fakeGetItems = items => {
    const fake = () =>
      new Promise(resolve => {
        resolve(items);
      });
    sinon.replace(
      api,
      "getItems",
      fake
    );
    return fake;
  };
  let fakeMarkDone = () => {
    let fake = () => new Promise(resolve => { resolve(true); });
    sinon.replace(api, 'markDone', fake);
    return fake;
  }
  beforeEach(() => {
    div = document.createElement("div");
  });
  afterEach(() => {
    sinon.restore();
  });
  it("G", done => {
    fakeGetItems([{ title: 'foo', id: 1 }]);
    fakeMarkDone();
    const { getByTestId } = render(<ToDo />);
    setTimeout(() => {
      fireEvent.click(getByTestId("checkbox-1"));
      fireEvent.click(getByTestId("mark-done"));
      done();
      
    }, 100);
  });
});
