// src/utils/invoiceStatus.ts
export const getInvoiceStatus = (invoice) => {
  if (!invoice) return "Unknown";

  const today = new Date();
  const dueDate = new Date(invoice.dueDate || invoice.duedate);
  const paid = invoice.is_paid;
  const status = invoice.status;

  if (status === "cancelled") return "Cancelled";
  if (status === "draft") return "Draft";
  if (paid) return "Paid";
  if (!paid && dueDate < today) return "Overdue";
  return "Pending";
};
