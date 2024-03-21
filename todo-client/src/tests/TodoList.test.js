import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

// Mock child components if necessary, especially if they are not the focus of the test or if they make external calls
// jest.mock('./TodoItem', () => (props) => <mock-TodoItem {...props} />);

const mockTodos = [
  { id: 1, title: 'Test Todo 1', completed: false },
  { id: 2, title: 'Test Todo 2', completed: true },
  { id: 3, title: 'Test Todo 3', completed: false },
];

describe('TodoList Component', () => {
  test('renders the correct number of todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleCompleted={() => {}}
        onUpdateTodo={() => {}}
        onDelete={() => {}}
      />
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockTodos.length);
  });

  test('calls onToggleCompleted when a todo item is toggled', async () => {
    const onToggleCompleted = jest.fn();
    render(
      <TodoList
        todos={mockTodos}
        onToggleCompleted={onToggleCompleted}
        onUpdateTodo={() => {}}
        onDelete={() => {}}
      />
    );

    const firstItemToggle = within(screen.getAllByRole('listitem')[0]).getByRole('checkbox');
    await userEvent.click(firstItemToggle);
    
    expect(onToggleCompleted).toHaveBeenCalledWith(mockTodos[0].id);
  });
});
