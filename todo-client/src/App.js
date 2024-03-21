import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await axios.put(`http://localhost:8080/todos/${id}`, updatedTodo);
      setTodos(todos.map((todo) => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const onUpdateTodo = async (id, title) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todoToUpdate, title };
      await axios.put(`http://localhost:8080/todos/${id}`, updatedTodo);
      setTodos(todos.map((todo) => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      await Promise.all(completedTodos.map(todo =>
        axios.delete(`http://localhost:8080/todos/${todo.id}`)
      ));
      setTodos(todos.filter((todo) => !todo.completed));
    } catch (error) {
      console.error('Failed to clear completed todos:', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className="todoapp">
      <p className="title">todos</p>
      <AddTodo onAdd={addTodo} />
      <TodoList
        todos={filteredTodos}
        onToggleCompleted={toggleTodo}
        onUpdateTodo={onUpdateTodo}
        onDelete={deleteTodo}
      />
      <Footer
        todosCount={todos.length}
        activeCount={todos.filter((todo) => !todo.completed).length}
        filter={filter}
        onClearCompleted={clearCompleted}
        onFilterChange={setFilter}
      />
    </div>
  );
}

export default App;