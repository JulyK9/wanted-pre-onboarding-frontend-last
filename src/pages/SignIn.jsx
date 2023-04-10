const SignIn = () => {
  return (
    <>
      <input data-testid="email-input" type="email" />
      <input data-testid="password-input" type="password" />
      <button data-testid="signin-button">제출</button>
    </>
  );
};

export default SignIn;
