import React, { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import CreateInvoicePage from './pages/invoice/CreateInvoicePage';
import InvoiceTemplates from './pages/InvoiceTemplates';
import Index from './pages/Index';
import Clients from './pages/clients';
import Reports from './pages/Reports';
import Pricing from './pages/pricing';
import TestDialog from "@/pages/TestDialog";
import { Session } from '@supabase/supabase-js';
import SessionHandler from "@/components/SessionHandler";
import TailwindForceStyles from "@/components/debug/TailwindForceStyles";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!session) return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
    return <>{children}</>;
  };

  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (session) {
      const state = location.state as { from?: string };
      const destination = state?.from || '/dashboard';
      return <Navigate to={destination} />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <SessionHandler setSession={setSession} setLoading={setLoading} />
      <TailwindForceStyles />

      <Routes>
        <Route path="/" element={<Index />} />

        {/* Auth routes */}
        <Route path="/auth/login" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/auth/register" element={<AuthRoute><Auth /></AuthRoute>} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/invoice/create" element={<ProtectedRoute><CreateInvoicePage /></ProtectedRoute>} />
        <Route path="/create-invoice" element={<ProtectedRoute><CreateInvoicePage /></ProtectedRoute>} />
        <Route path="/invoice-templates" element={<ProtectedRoute><InvoiceTemplates /></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
        <Route path="/testdialog" element={<TestDialog />} />
      </Routes>
    </>
  );
}

export default App;
