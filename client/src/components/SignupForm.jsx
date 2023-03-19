import React, { useState } from "react";
import axios from "axios";
import { GlobalStyle, Wrapper, Label, Input, Button, Form } from "../styles/styles";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <h2>Signup</h2>
      {error && <div>{error}</div>}
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <Button type="submit">Signup</Button>
      </Form>
    </Wrapper>
  );
};

export default SignupForm;
