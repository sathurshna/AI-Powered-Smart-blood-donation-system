import { useState } from 'react';
import { loginUser, saveToken } from '../services/auth.service';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      saveToken(data.token);
      onLogin({ role: data.role });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '380px', margin: '80px auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🩸 Smart Blood Donation</h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.6rem' }}>
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>⚠ {error}</p>}
    </div>
  );
}

export default Login;
