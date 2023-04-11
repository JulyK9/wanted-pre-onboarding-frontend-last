import { useEffect, useState } from 'react';
import { BASE_URL } from '../api/const';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      throw new Error(data.Error || '로그인에 문제가 발생했습니다');
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      navigate('/todo');
    }
  });

  return (
    <>
      <h2>로그인 페이지</h2>
      <form onSubmit={loginHandler}>
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
        <button data-testid="signin-button">로그인</button>
      </form>
    </>
  );
};

export default SignIn;
