import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/shared/Button";
import FormField from "../../../components/shared/FormField";
import { login } from "../service";
import { useAuthHandlers } from "../context";

import "./LoginPage.css";
import { useLocation, useNavigate } from "react-router";

function LoginPage() {
  const { onLogin } = useAuthHandlers();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isFetching, setIsFeching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFeching(true);
      await login(credentials);
      setIsFeching(false);
      onLogin();
      const to = location?.state?.from?.pathname || "/";
      navigate(to);
    } catch (error) {
      setIsFeching(false);
      setError(error);
    }
  };

  const handleChange = (event) => {
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const resetError = () => {
    setError(null);
  };

  const { username, password } = credentials;
  const buttonDisabled = !(username && password) || isFetching;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="phone, email or username"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.username}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
        >
          {isFetching ? "Connecting..." : "Log in"}
        </Button>
        {error && (
          <div className="loginPage-error" onClick={resetError}>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}

// function LoginPagePortal({ count }) {
//   const portalContainer = useRef(document.createElement('div'));

//   useEffect(() => {
//     const externalWindow = window.open( 
//       "",
//       "",
//       "width=600, heght=400, left=200, top=200",
//     );
//     externalWindow.document.body.appendChild(portalContainer.current);

//     return ()=>{
//       externalWindow.close()
//     }
//   });

//   return createPortal(<LoginPage count={ count }/>, portalContainer.current);
// }

export default LoginPage;
