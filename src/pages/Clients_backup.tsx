import React from "react";
import { ClientList } from './clients/components/ClientList'; // Assuming it's correctly exported

import DashboardLayout from "@/components/layouts/DashboardLayout"; // Make sure you're using the correct layout

const Clients = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">Manage your clients and their details</p>
          </div>
          {/* You can add action buttons here if necessary */}
        </div>

        {/* Clients List Display */}
        <ClientList
          clients={[]} // Replace with actual client data
          onViewClient={() => {}}
          onEditClient={() => {}}
          onDeleteClient={() => {}}
        />
      </div>
    </DashboardLayout>
  );
};

export default Clients;
