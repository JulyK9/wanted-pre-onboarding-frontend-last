import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/const';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const MainContainer = styled.div`
  /* background-color: lightgray; */
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 40%;
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;

  input {
    padding: 0.8rem 1rem;
    border-radius: 3px;
    font-size: 1rem;

    &:focus {
      border: 1px solid #5a9bd1;
    }
  }

  button {
    width: 100%;
    height: 2.8rem;
    border-radius: 3px;
    background-color: #5a9bd1;
    color: white;
    font-size: 1.1rem;

    &:hover {
      background-color: steelblue;
    }

    &:disabled {
      background-color: lightsteelblue;
    }
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validCheck, setValidCheck] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const reqBody = {
      email,
      password,
    };

    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('accessToken', responseData.access_token);

      navigate('/todo');
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '로그인에 문제가 발생했습니다');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/todo');
    }

    if (!email || email.includes('@')) {
      console.log('유효하지 않은 이메일입니다.');
      setValidCheck(false);
    }
    if (!password || password.length < 8) {
      console.log('비밀번호는 8자 이상이어야 합니다.');
      setValidCheck(false);
      return;
    }
    setValidCheck(true);
  }, [email, password, navigate]);

  return (
    <MainContainer>
      <h2>로그인</h2>
      <FormContainer onSubmit={loginHandler}>
        <input
          data-testid="email-input"
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="password-input"
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="signin-button" disabled={!validCheck}>
          로그인
        </button>
      </FormContainer>
    </MainContainer>
  );
};

export default SignIn;
