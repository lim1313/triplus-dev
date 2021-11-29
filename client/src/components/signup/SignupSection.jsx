import React, { useState } from 'react';
import SignupId from './SignupId';
import SignupPw from './SignupPw';
import SIgnupBtns from './SIgnupBtns';
import SignupEmail from './SignupEmail';
import styled from 'styled-components';
import { idValidation, emailValidation, pwValidaton } from '../../utils/validation';
import { checkId } from '../../network/signup/http';

const SectionBlock = styled.div`
  max-width: 100%;
`;

export default function SignupSection() {
  const [message, setMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [checkMessage, setCheckMessage] = useState('');
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

  const handleInputChange = (e) => {
    const name = e.target.name;
    setInputs({ ...inputs, [name]: e.target.value });
  };
  const handleIdBlur = () => {
    if (!idValidation(inputs.userId)) {
      setMessage('4~12자리의 영문, 숫자만 가능합니다.');
      setValid({ ...valid, userId: false });
    } else {
      checkId(inputs.userId).then((res) => {
        setMessage(res.data.message);
        setValid({ ...valid, userId: true });
      });
    }
  };
  const handleEmailBlur = () => {
    if (!emailValidation(inputs.email)) {
      setEmailMessage('이메일 형식에 맞춰 작성해주세요.');
      setValid({ ...valid, email: false });
    } else {
      setEmailMessage('');
      setValid({ ...valid, email: true });
    }
  };
  const handlePwBlur = () => {
    if (!pwValidaton(inputs.password)) {
      setPwMessage('8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.');
      setValid({ ...valid, password: false });
    } else {
      setPwMessage('');
      setValid({ ...valid, password: true });
    }
  };
  const handleCheckBlur = () => {
    if (inputs.check !== inputs.password) {
      setCheckMessage('비밀번호가 일치하지 않습니다.');
      setValid({ ...valid, check: false });
    } else {
      setCheckMessage('');
      setValid({ ...valid, check: true });
    }
  };

  // const handleSignupClick = () => {
  //   if() {

  //   }
  // }

  return (
    <SectionBlock>
      <SignupId
        handleInputChange={handleInputChange}
        value={inputs.userId}
        handleIdBlur={handleIdBlur}
        message={message}
      />
      <SignupEmail
        handleInputChange={handleInputChange}
        value={inputs.email}
        handleEmailBlur={handleEmailBlur}
        emailMessage={emailMessage}
      />
      <SignupPw
        handleInputChange={handleInputChange}
        value={inputs.password}
        handlePwBlur={handlePwBlur}
        pwMessage={pwMessage}
        valid={valid}
        checkValue={inputs.check}
        handleCheckBlur={handleCheckBlur}
        checkMessage={checkMessage}
      />
      <SIgnupBtns />
    </SectionBlock>
  );
}
