import React, { useState } from 'react';
import SignupId from './SignupId';
import SignupPw from './SignupPw';
import SIgnupBtns from './SIgnupBtns';
import SignupEmail from './SignupEmail';
import styled from 'styled-components';

const SectionBlock = styled.div`
  max-width: 100%;
`;

export default function SignupSection() {
  const [inputs, setInputs] = useState({
    userId: '',
    password: '',
    email: '',
    role: 'general',
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    setInputs({ ...inputs, [name]: e.target.value });
  };
  return (
    <SectionBlock>
      <SignupId handleInputChange={handleInputChange} value={inputs.userId} />
      <SignupEmail handleInputChange={handleInputChange} value={inputs.email} />
      <SignupPw handleInputChange={handleInputChange} value={inputs.password} />
      <SIgnupBtns />
    </SectionBlock>
  );
}
