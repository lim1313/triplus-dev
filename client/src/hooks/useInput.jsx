import { useState } from 'react';

export const useInput = (content) => {
  const [inputValue, setInputValue] = useState(content);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  return [inputValue, onChange, setInputValue];
};
