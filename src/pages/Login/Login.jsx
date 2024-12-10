import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { login } from "../../app/services/api/login";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      await login({ username, password });
      console.log("Sesión iniciada " + username);
      localStorage.setItem("username", username); // Guardar username en localStorage
      navigate("/"); // Redirigir al inicio
    } catch (error) {
      console.log(error);
      console.log("Error al iniciar sesión");
    }
  };

  return (
    <div className="login">
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Login;
