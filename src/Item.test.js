import React from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';


describe('Item', () => {
  let div;
  beforeEach(()=> {
    div = document.createElement('div');
  })
  it('renders as a list item', () => {
    const item = ReactDOM.render(<Item id="1" key="1"/>, div);
    const li = ReactDOM.findDOMNode(item);
    expect(li.getAttribute('class')).toEqual('list-group-item');
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders a first child checkbox', () => {
    const item = ReactDOM.render(<Item id="1" key="1"/>, div);
    const input = ReactDOM.findDOMNode(item).firstChild;
    expect(input.tagName).toEqual('INPUT');
    expect(input.type).toBe('checkbox');
    expect(input.getAttribute('class')).toEqual('form-check-input');
    expect(input.dataset.key).toEqual('1');
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders a done badge if the item is done', () => {
    const item = ReactDOM.render(<Item id="1" key="1" done={true}/>, div);
    const badge = ReactDOM.findDOMNode(item).children[2];
    expect(badge.tagName).toEqual('SPAN');
    expect(badge.getAttribute('class')).toEqual('badge badge-success');
    expect(badge.textContent).toEqual('Done')
    ReactDOM.unmountComponentAtNode(div);
  });
});