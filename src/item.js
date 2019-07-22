import React from "react";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.titleClasses = ["todo-title"];
  }
  render() {
    let doneBadge;
    if (this.props.done) {
      this.titleClasses.push("done");
      doneBadge = <span className="badge badge-success">Done</span>;
    } else {
      this.titleClasses.push("to-do");
      doneBadge = null;
    }
    return (
      <li key={this.props.id} className="list-group-item">
        <input
          ref={this.props.setItemCheckboxesRef}
          data-key={this.props.id}
          className="form-check-input"
          type="checkbox"
        />
        <span className={this.titleClasses.join(" ")}>{this.props.title}</span>
        {doneBadge}
      </li>
    );
  }
}
