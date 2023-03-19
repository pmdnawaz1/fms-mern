import React, { useState } from "react";
import axios from "axios";
import { GlobalStyle, Wrapper, Label, Input, Button, Form } from "../styles/styles";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
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
      <h2>Login</h2>
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
        <Button type="submit">Login</Button>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
