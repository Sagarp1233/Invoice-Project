import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/toaster"; // ✅ Ensures toast is always available

// Create a client for React Query
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster /> {/* ✅ Globally mounted Toaster */}
    </QueryClientProvider>
  </BrowserRouter>
);
