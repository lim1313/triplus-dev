import { useState } from 'react';

export const useInput = (content) => {
  const [inputValue, setInputValue] = useState(content);

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  return [inputValue, inputChange, setInputValue];
};
