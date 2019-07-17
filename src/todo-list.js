import React from 'react';


export default class TodoList extends React.Component {
  titleClasses = ['todo-title'];
  render() {
    return (<div><h2>To Do List</h2>
      <ul className="list-group form-check">
        {this.props.items.length > 0 ?
          this.props.items.map(item => {
            let doneBadge;
            if (item.done) {
              this.titleClasses.push('done');
              doneBadge = <span className="badge badge-success">Done</span>;
            } else {
              this.titleClasses.push('to-do');
              doneBadge = null;
            }
            return <li key={item.id} className="list-group-item">
              <input ref={this.props.setItemCheckboxesRef}
                data-key={item.id}
                className="form-check-input"
                type="checkbox" />
              <span className={this.titleClasses.join(' ')}>{item.title}</span>{doneBadge}
            </li>;
          })
          : <div className="alert alert-warning" role="alert">No items yet...</div>}
      </ul></div>);
  }
}