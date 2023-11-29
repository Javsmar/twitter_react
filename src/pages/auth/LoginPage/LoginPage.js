import { useState } from 'react';
import Button from '../../../components/shared/Button';
import FormField from '../../../components/shared/FormField';
import { login } from '../service';
import { useAuth } from '../context';

import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    await login(credentials);

    onLogin();

    const to = location?.state?.from?.pathname || '/';
    navigate(to);
  };

  const handleChange = event => {
    setCredentials(currentCredentials => ({
      ...currentCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const { username, password } = credentials;
  const buttonDisabled = !(username && password);

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
          Log in
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
