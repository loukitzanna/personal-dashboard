import React from 'react';
import { HeroUIProvider } from "@heroui/react";
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <HeroUIProvider>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard!</h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Dashboard />
          </main>
        </div>
      </HeroUIProvider>
    </ApolloProvider>
  );
}

export default App;