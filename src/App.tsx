import { useContext } from 'react';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return !user ? <Login /> : <Dashboard />;
}

export default App;
