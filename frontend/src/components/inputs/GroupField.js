import React, { useState } from 'react';
import { InputField } from './InputField';

export const GroupField = ({ onValue }) => {
  const [group, setGroup] = useState('');
  const [error, setError] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setGroup(value);
    onValue(value);
    setError(!value.length === 5);
  };

  return (
    <InputField
      onValueChange={onValueChange}
      value={group}
      error={error}
      icon='card-checklist'
      placeholder='group name'
      required={true}
    />
  );
};
