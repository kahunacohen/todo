import React from "react";

export default class Actions extends React.Component {
  render() {
    return (
      <div>
        <h2>Actions</h2>
        <ul id="actions">
          <li>
            <input ref={this.props.setAddInput} type="text" />
            <button
              type="button"
              className="btn-sm btn-info"
              onClick={this.props.handleAddItem}
            >
              Add
            </button>
          </li>
          <li>
            <button
              data-testid="mark-done"
              type="button"
              className="btn-sm btn-success"
              onClick={this.props.handleMarkDone}
            >
              Mark Done
            </button>
          </li>
          <li>
            <button
              data-testid="mark-undone"
              type="button"
              className="btn-sm btn-secondary"
              onClick={this.props.handleMarkUndone}
            >
              Mark Undone
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn-sm btn-danger"
              onClick={this.props.handleDeleteItem}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
