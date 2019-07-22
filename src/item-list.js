import React from 'react';

import Item from './item';

export default class ItemList extends React.Component {
  render() {
    return(
    <div>
    <h2>To Do List</h2>
    <ul className="list-group form-check">
      {this.props.items.length > 0 ? (
        this.props.items.map(item => {
            return <Item
              key={item.id}
              setItemCheckboxesRef={this.props.setItemCheckboxesRef}
              title={item.title}
              done={item.done}
              id={item.id}
            />
        })
      ) : (
        <div className="alert alert-warning" role="alert">
          No items yet...
        </div>
      )}
    </ul>
  </div>);
  }
}