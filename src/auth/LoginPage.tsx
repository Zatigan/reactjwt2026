import { SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { getRoles, hasRole, loginUser } from './auth.service';

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('bastien@example.com');
  const [password, setPassword] = useState('tacostacos');

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    try {
      const response = await loginUser(username, password);
      localStorage.setItem("token", response.token);
      const roleData = getRoles(response.token);
      const role = hasRole(roleData);
      console.log(role);
      
      navigate('/todos');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            autoComplete="username"
            placeholder="email@example.com"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>

        <label>
          <span>Password: </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="**********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit">Send</button>
      </form>
    </>
  );
}
