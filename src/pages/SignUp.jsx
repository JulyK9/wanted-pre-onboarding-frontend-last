import { useState, useEffect } from 'react';
import { BASE_URL } from '../api/const';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validCheck, setValidCheck] = useState(false);

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();

    const reqBody = {
      email,
      password,
    };

    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      alert('로그인 성공. 회원가입 페이지로 이동합니다.');
      navigate('/signin');
    }

    if (!response.ok) {
      const responseDdata = await response.json();
      throw new Error(
        responseDdata.message || '회원가입에 문제가 발생했습니다.'
      );
    }
  };

  useEffect(() => {
    if (!email || !email.includes('@')) {
      console.log('유효하지 않은 이메일입니다.');
      setValidCheck(false);
    }
    if (!password || password.length < 8) {
      console.log('비밀번호는 8자 이상이어야 합니다');
      setValidCheck(false);
      return;
    }
    setValidCheck(true);
  }, [email, password]);

  return (
    <>
      <h2>회원가입 페이지</h2>
      <form onSubmit={signUpHandler}>
        <input
          data-testid="email-input"
          type="text"
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
        <button data-testid="signup-button" disabled={!validCheck}>
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
