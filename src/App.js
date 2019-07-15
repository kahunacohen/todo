import React from 'react';

function App() {
  return (
    <div className="container">
      <div class="row">
        <div class="col-md">
          <h2>To Do List</h2>
          <ul class="list-group">
            <li class="list-group-item active">
              <img src="./check.png"/><span class="todo-title done">Go to birthday party</span>
            </li>
            <li class="list-group-item">
              <span class="todo-title to-do">Buy groceries</span>
            </li>
            <li class="list-group-item">
              <span class="todo-title to-do">Buy casket</span></li>
            <li class="list-group-item">
              <span class="todo-title to-do">Pay electric bill</span></li>
            <li class="list-group-item">
              <span class="todo-title to-do">Set mouse trap</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
