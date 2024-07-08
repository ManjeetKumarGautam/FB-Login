import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);



  return (
    <div className="App">
      {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}
      {/* <Dashboard /> */}

      {user ? user.name : ''}
    </div>
  );
}

export default App;
