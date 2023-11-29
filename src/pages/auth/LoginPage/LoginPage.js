import { useState } from "react";
import Button from "../../../components/shared/Button";
import FormField from "../../../components/shared/FormField";
import { login } from "../service";
import { useAuth } from "../context";

import "./LoginPage.css";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isfetching, setIsfetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsfetching(true);
      await login(credentials);
      onLogin();
      setIsfetching(false);
      const to = location?.state?.from?.pathname || "/";
      navigate(to);
    } catch (error) {
      setIsfetching(false);
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
  const buttonDisabled = !(username && password) || isfetching;

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
          {isfetching ? "Connecting..." : "Log in"}
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

export default LoginPage;
