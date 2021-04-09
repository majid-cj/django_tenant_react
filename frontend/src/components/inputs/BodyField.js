import React, { useState } from 'react';
import { TextAreaField } from './TextAreaField';

export const BodyField = ({ onValue }) => {
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const onValueChange = ({ target: { value } }) => {
    setBody(value);
    onValue(value);
    setError(!value.length === 0);
  };

  return (
    <TextAreaField
      onValueChange={onValueChange}
      value={body}
      error={error}
      icon='cursor-text'
      placeholder='todo body'
      required={true}
    />
  );
};
