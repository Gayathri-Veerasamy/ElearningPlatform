import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/elearn/signup", {
        userName: username,
        password: password,
      });

      console.log("Signup Success:", response.data);
      alert("Signup successful!");
      navigate("/Course");
    } catch (error) {
      console.error("Error occurs:", error);
      if (error.response?.status === 409) {
        setErrorMessage("User already exists");
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errorMessage && <p style={{ color: "red", fontSize: "10px" }}>{errorMessage}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
