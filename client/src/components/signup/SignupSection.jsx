import React, { useState } from 'react';
import SignupId from './SignupId';
import SignupPw from './SignupPw';
import SIgnupBtns from './SIgnupBtns';
import SignupEmail from './SignupEmail';
import styled from 'styled-components';
import { idValidation, emailValidation, pwValidaton } from '../../utils/validation';
import { checkId, signUp } from '../../network/signup/http';

const SectionBlock = styled.div`
  max-width: 100%;
  & .errmessage {
    color: ${({ theme }) => theme.color.red};
  }
`;

export default function SignupSection() {
  const [message, setMessage] = useState({
    userId: '',
    password: '',
    email: '',
    check: '',
  });
  const [valid, setValid] = useState({
    userId: false,
    password: false,
    email: false,
    check: false,
  });
  const [inputs, setInputs] = useState({
    userId: '',
    password: '',
    email: '',
    check: '',
  });
  const [signupErr, setErr] = useState('');

  const handleInputChange = (e) => {
    const name = e.target.name;
    setInputs({ ...inputs, [name]: e.target.value });
  };
  const handleIdBlur = () => {
    if (!idValidation(inputs.userId)) {
      setMessage({ ...message, userId: '4~12자리의 영문, 숫자만 가능합니다.' });
      setValid({ ...valid, userId: false });
    } else {
      checkId(inputs.userId).then((res) => {
        setMessage({ ...message, userId: res.data.message });
        setValid({ ...valid, userId: true });
      });
    }
  };
  const handleEmailBlur = () => {
    if (!emailValidation(inputs.email)) {
      setMessage({ ...message, email: '이메일 형식에 맞춰 작성해주세요.' });
      setValid({ ...valid, email: false });
    } else {
      setMessage({ ...message, email: '' });
      setValid({ ...valid, email: true });
    }
  };
  const handlePwBlur = () => {
    if (!pwValidaton(inputs.password)) {
      setMessage({ ...message, password: '8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.' });
      setValid({ ...valid, password: false });
    } else {
      setMessage({ ...message, password: '' });
      setValid({ ...valid, password: true });
    }
  };
  const handleCheckBlur = () => {
    if (inputs.check !== inputs.password) {
      setMessage({ ...message, check: '비밀번호가 일치하지 않습니다.' });
      setValid({ ...valid, check: false });
    } else {
      setMessage({ ...message, check: '' });
      setValid({ ...valid, check: true });
    }
  };
  const handleSignupClick = () => {
    let result = [];
    for (let key in valid) {
      if (valid[key] === false) {
        result.push(key);
      }
    }
    if (result.length === 0) {
      let body = {
        userId: inputs.userId,
        password: inputs.password,
        email: inputs.email,
      };
      signUp(body);
    } else {
      setErr('정확한 정보를 기입해주세요');
    }
  };

  return (
    <SectionBlock>
      <SignupId
        handleInputChange={handleInputChange}
        value={inputs.userId}
        handleIdBlur={handleIdBlur}
        message={message.userId}
      />
      <SignupEmail
        handleInputChange={handleInputChange}
        value={inputs.email}
        handleEmailBlur={handleEmailBlur}
        emailMessage={message.email}
      />
      <SignupPw
        handleInputChange={handleInputChange}
        value={inputs.password}
        handlePwBlur={handlePwBlur}
        pwMessage={message.password}
        valid={valid}
        checkValue={inputs.check}
        handleCheckBlur={handleCheckBlur}
        checkMessage={message.check}
      />
      {signupErr ? <span className='errmessage'>정확한 정보를 기입해주세요</span> : null}
      <SIgnupBtns handleSignupClick={handleSignupClick} />
    </SectionBlock>
  );
}
