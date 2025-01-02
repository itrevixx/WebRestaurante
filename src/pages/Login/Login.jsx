import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertTitle, TextField } from "@mui/material";
import "./Login.css";
import { login } from "../../app/services/api/login";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!username || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    try {
      await login({ username, password });
      localStorage.setItem("username", username);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="login">
      <div style={{ height: "75px" }}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </div>
      <form onKeyDown={handleKeyDown}>
        <TextField
          variant="outlined"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          type="password"
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="button" onClick={handleClick}>
          Acceder
        </button>
      </form>
    </div>
  );
};

export default Login;
