import React from 'react';

import FilterItem from '../FilterItem/FilterItem';

const TasksFilter = ({ filters, filter, changeFilterTodo }) => {
  return (
    <ul className="filters">
      {filters.map((filterItem) => (
        <FilterItem key={filterItem} filter={filterItem} changeFilterTodo={changeFilterTodo} currentFilter={filter} />
      ))}
    </ul>
  );
};

TasksFilter.defaultProps = {
  filters: ['All'],
};

export default TasksFilter;
