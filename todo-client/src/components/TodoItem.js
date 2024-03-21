import React, { useState } from "react";

function TodoItem({ todo, onToggleCompleted, onUpdateTodo, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTodo(todo.id, editTitle);
    setIsEditing(false);
  };

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        isEditing ? "editing" : ""
      }`}
    >
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            className="edit"
            value={editTitle}
            onChange={handleChange}
            onBlur={handleSubmit}
            autoFocus
          />
        </form>
      )}
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleCompleted(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        {!isEditing && <button className="destroy" onClick={() => onDelete(todo.id)} />}
      </div>
    </li>
  );
}

export default TodoItem;
