import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ onAdd }) {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;
    const newTodo = { title: task, completed: false };
    const response = await axios.post('http://localhost:8080/todos', newTodo);
    onAdd(response.data);
    setTask('');
  };

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
    </header>
  );
}

export default AddTodo;
