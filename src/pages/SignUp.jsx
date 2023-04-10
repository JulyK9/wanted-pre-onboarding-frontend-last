const SignUp = () => {
  return (
    <>
      <input data-testid="email-input" type="email" />
      <input data-testid="password-input" type="password" />
      <button data-testid="signup-button">제출</button>
    </>
  );
};

export default SignUp;
