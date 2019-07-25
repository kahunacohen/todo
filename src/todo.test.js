import api from './api';
import React from "react";
import ReactDOM from "react-dom";
import ToDo from "./todo";
import {render, fireEvent} from '@testing-library/react';

import sinon from "sinon";


describe("Todo", () => {
  let div;
  beforeEach(() => {
    div = document.createElement("div");
    sinon.replace(api, 'getItems', sinon.fake(() => [{ title: 'foo', id: 1 }]));
    sinon.replace(api, 'markDone', sinon.fake(() => {
      return new Promise(r => {r(true)});
    }));

  });
  afterEach(() => {
    sinon.restore();
  })
  it("fudge", done => {
    const {getByTestId} = render(<ToDo />);
    setTimeout(() => {
      fireEvent.click(getByTestId('checkbox-1'));
      fireEvent.click(getByTestId('mark-done'));
      done();
    }, 100);
  });
});
