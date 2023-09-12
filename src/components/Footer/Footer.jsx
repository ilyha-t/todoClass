import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

const Footer = ({ todoCount, filter, changeFilterTodo, filters, clearCompleted }) => {
  Footer.propTypes = {
    todoCount: PropTypes.number,
    filter: PropTypes.string,
    changeFilterTodo: PropTypes.func,
    filters: PropTypes.array,
    clearCompleted: PropTypes.func,
  };

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filter={filter} changeFilterTodo={changeFilterTodo} filters={filters} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
