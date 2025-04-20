export const getInvoiceById = async (id: string) => {
  const storedInvoices = localStorage.getItem("invoices");
  if (!storedInvoices) return null;

  try {
    const invoices = JSON.parse(storedInvoices);
    return invoices.find((invoice: any) => invoice.id === id) || null;
  } catch (error) {
    console.error("Failed to parse invoices from localStorage:", error);
    return null;
  }
};
