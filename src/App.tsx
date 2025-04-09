import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { HeroUIProvider, Switch, Image } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import client from './graphql/client';
import Dashboard from './components/Dashboard';
import ThemeSwitch from './components/ThemeSwitcher';
import './index.css';

function App() {
    return (
        <ApolloProvider client={client}>
            <HeroUIProvider>
                <NextThemesProvider attribute='class' defaultTheme='dark'>
                    <div className='min-h-screen bg-gray-50 dark:bg-black'>
                        <header className='bg-white dark:bg-black shadow'>
                            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
                                <Image src='/assets/logo.svg' alt='Logo' className='w-16 h-16' />
                                <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                    Welcome to your Dashboard!
                                </h1>
                                <ThemeSwitch />
                            </div>
                        </header>
                        <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
                            <Dashboard />
                        </main>
                    </div>
                </NextThemesProvider>
            </HeroUIProvider>
        </ApolloProvider>
    );
}

export default App;
