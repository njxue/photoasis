"use client";

import signUp from "@actions/signUp";

const SignUpButton = () => {
  const handleSignUp = async () => {
    await signUp("email", "password");
  };
  return (
    <button className="btn-gray" onClick={handleSignUp}>
      Sign up
    </button>
  );
};

export default SignUpButton;
