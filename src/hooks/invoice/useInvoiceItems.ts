
import { useState } from "react";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export const useInvoiceItems = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "Website Design",
      quantity: 1,
      price: 1000,
      total: 1000,
    },
  ]);

  return {
    invoiceItems,
    setInvoiceItems,
  };
};
