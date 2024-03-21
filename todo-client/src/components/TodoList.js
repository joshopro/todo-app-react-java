import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleCompleted, onUpdateTodo, onDelete }) {
  const todoItems = todos.map((todo) =>
    <TodoItem
      key={todo.id}
      todo={todo}
      onToggleCompleted={onToggleCompleted}
      onUpdateTodo={onUpdateTodo}
      onDelete={onDelete}
    />
  );

  return (
    <section className="main">
      <ul className="todo-list">
        {todoItems}
      </ul>
    </section>
  );
}

export default TodoList;
