import React from 'react';
import { TodoCard } from './TodoCard';

export const TodoList = ({ results = [] }) => {
  return (
    <div className='flex-column'>
      {results.map((todo, index) => (
        <TodoCard todo={todo} key={index} />
      ))}
    </div>
  );
};
