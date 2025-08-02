import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:8080/elearn/login";

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(url, {
      userName: username,
      password: password,
    });

    const data = response.data;
    console.log("Raw login response:", data);

    const { token, userName, userId } = data;

    if (!token || !userName || userId == null) {
      throw new Error("Invalid login response: Missing token or user info");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("username", userName);
    localStorage.setItem("user", JSON.stringify({ userId, name: userName }));

    navigate("/Course");
  } catch (error) {
    console.error("Login failed:", error.message || error);
    setError("Invalid username or password!");
  }
};


  return (
  <div className="login-container">
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error-message">{error}</p>}

      <button type="submit">Login</button>
    </form>
    <Link to="/signup">Don't have an account? Sign up</Link>
  </div>
);

  
}

export default Login;
