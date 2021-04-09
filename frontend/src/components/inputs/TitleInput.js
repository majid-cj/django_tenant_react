import React, { useState } from 'react';
import { InputField } from './InputField';

export const TitleInput = ({ onValue }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [error, setError] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setTodoTitle(value);
    onValue(value);
    setError(!value.length === 0);
  };

  return (
    <InputField
      onValueChange={onValueChange}
      value={todoTitle}
      error={error}
      icon='hash'
      placeholder='todo title'
      required={true}
    />
  );
};
