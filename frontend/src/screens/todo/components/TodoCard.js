import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../../../actions';

export const TodoCard = ({ todo }) => {
  const dispatch = useDispatch();
  const { id, title, body, is_done } = todo;

  const onChecked = () => {
    dispatch(updateTodo({ ...todo, is_done: !is_done }));
  };

  return (
    <div className='rounded col-10 border border-light m-1 p-1'>
      <div className='d-flex flex-row align-items-center'>
        <input className='mx-1 fs-1' type='checkbox' id={`${id}-check-box`} defaultChecked={is_done} onChange={onChecked} />
        <label className='mx-1 fs-3' htmlFor={`${id}-check-box`}>
          {title}
        </label>
      </div>
      <p>{body}</p>
    </div>
  );
};
