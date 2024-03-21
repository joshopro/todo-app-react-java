import React from 'react';

function Footer({ todosCount, activeCount, filter, onClearCompleted, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <ul className="filters">
        {['All', 'Active', 'Completed'].map((status) => (
          <li key={status}>
            <a
              href="#/"
              className={filter === status ? 'selected' : ''}
              onClick={() => onFilterChange(status)}
            >
              {status}
            </a>
          </li>
        ))}
      </ul>

      {todosCount > activeCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default Footer;
