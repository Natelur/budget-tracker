import { Button, Container, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useTheme } from "../ThemeProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { bodyClassName, fontColor } = useTheme(); // Extract fontColor from the theme

  function login() {
    const isCorrectUsername = username === "natalie@gmail.com";
    const isCorrectPassword = password === "password";
    if (isCorrectUsername && isCorrectPassword) {
      authContext.setToken("1234");
      navigate("/dashboard");
    }
  }

  return (
    <Container className={bodyClassName}>
      <h1 className="mt-4">Sign in to enter</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text style={{ color: fontColor }}>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={login} type="Login">
          Login
        </Button>
      </Form>
    </Container>
  );
}
