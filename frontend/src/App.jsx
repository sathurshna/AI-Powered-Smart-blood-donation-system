import { useState } from 'react';
import Login from './pages/Login';
import './App.css';

function App() {
  // After login, store the user's role so we can route to the right dashboard
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // Placeholder dashboards — will be built in issues #36–#41
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome 👋</h1>
      <p>Logged in as <strong>{user.role}</strong></p>
      <button onClick={() => setUser(null)}>Log out</button>
    </div>
  );
}

export default App;
