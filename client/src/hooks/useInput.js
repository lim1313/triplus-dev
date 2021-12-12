import { useState } from 'react';

export const useInput = (content) => {
  const [inputValue, setInputValue] = useState(content);

  const inputChange = (e) => {
    setInputValue(e.target.value);
  };

  return [inputValue, inputChange, setInputValue];
};

// yeji / 20211212
// 기능 : input의 onchange 이벤트 발생 시 input value 값을 state에 반영할 수 있도록 함
// 매개변수
// 1) content : content를 통해 초기 state 설정
