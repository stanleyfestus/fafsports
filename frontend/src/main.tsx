import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css';
import store from '../store/store.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Router>
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </Router>
    
  </StrictMode>
);
