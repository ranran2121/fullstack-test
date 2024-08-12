import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query components

import Routes from './routes/index';
import { AppProvider } from './helpers/AppContext';
import { AuthContextProvider } from './helpers/core/AuthContext';
import { MessageProvider } from './helpers/core/MessageContext';
import ThemeProvider from './helpers/core/ThemeProvider';
import { ApiInterceptor } from './helpers/core/Api';

import FullpageLoading from './components/core/extra/FullpageLoading';

import './helpers/core/i18n';
import './styles/style.css';

// Create a React Query client
const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Suspense fallback={<FullpageLoading />}>
    <AppProvider>
      <ThemeProvider>
        <MessageProvider>
          <ApiInterceptor>
            <AuthContextProvider>
              <QueryClientProvider client={queryClient}>
                <Routes />
              </QueryClientProvider>
            </AuthContextProvider>
          </ApiInterceptor>
        </MessageProvider>
      </ThemeProvider>
    </AppProvider>
  </Suspense>
);
