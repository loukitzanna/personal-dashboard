import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;