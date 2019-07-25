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
  });
  afterEach(() => {
    sinon.restore();
  })
  //https://github.com/testing-library/react-testing-library#the-problem
  it("fudge", done => {
    const {getByText} = render(<ToDo />);
    setTimeout(() => {
      getByText('foo');
      done();
    }, 100);
  });
});
