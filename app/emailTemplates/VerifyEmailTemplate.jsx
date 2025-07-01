const VerifyEmailTemplate = (token) => {
  const activationLink = `http://localhost:3000/emailVerification?token=${token}`;
  return (
    <div>
      <h1>Welcome to Photoasis!</h1>
      <p>
        To activate your account, please click <a href={activationLink}>here</a>{" "}
        to verify your email address
      </p>
    </div>
  );
};

export default VerifyEmailTemplate;
