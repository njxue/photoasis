const ResetPasswordTemplate = (token) => {
  const resetLink = `http://localhost:3000/resetPassword?token=${token}`;
  return (
    <div>
      <h1>Welcome to Photoasis!</h1>
      <p>
        We received a request to reset your password for your Photoasis account.
        Click the button below to set a new password. This link will expire in
        <strong> 5 minutes</strong>.
      </p>
      <p style={{ margin: "20px 0" }}>
        <a
          href={resetLink}
          style={{
            backgroundColor: "#0D3B66",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "5px",
            textDecoration: "none",
            display: "inline-block",
          }}>
          Reset Password
        </a>
      </p>
    </div>
  );
};

export default ResetPasswordTemplate;
