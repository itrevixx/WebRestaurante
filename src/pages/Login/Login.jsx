import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { login } from "../../app/services/api/login";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
    <div className="container">
      <div className="login">
        <h2>Iniciar sesión</h2>
        <label htmlFor="username">Nombre de usuario o correo electrónico</label>
        <input
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-footer">
          <div className="remember-me">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember">Recuérdame</label>
            </div>
            <a href="/lostpassword">¿Has olvidado tu contraseña?</a>
          </div>

          <button onClick={handleClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
