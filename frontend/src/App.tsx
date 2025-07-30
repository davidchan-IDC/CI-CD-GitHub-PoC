import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CI/CD PoC Frontend</h1>
        <p>
          Welcome to the CI/CD Proof of Concept application!
        </p>
        <p>
          This React TypeScript frontend demonstrates:
        </p>
        <ul>
          <li>✅ React 18 with TypeScript</li>
          <li>✅ Jest testing framework</li>
          <li>✅ GitHub Actions CI/CD</li>
          <li>✅ GitLab CI/CD</li>
          <li>✅ AWS deployment (S3 + Lambda)</li>
        </ul>
      </header>
    </div>
  );
}

export default App; 