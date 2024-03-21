
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../components/TodoItem';

describe('TodoItem Component', () => {
  test('renders the todo item text', () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    render(<TodoItem todo={todo} onToggleCompleted={() => {}} onDelete={() => {}} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status when checkbox is clicked', () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const onToggleCompleted = jest.fn();

    render(<TodoItem todo={todo} onToggleCompleted={onToggleCompleted} onDelete={() => {}} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggleCompleted).toHaveBeenCalledWith(todo.id);
  });
});
