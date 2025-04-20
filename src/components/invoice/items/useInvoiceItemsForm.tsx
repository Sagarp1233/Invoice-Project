import { useState, useEffect, useMemo } from "react";
import { InvoiceItem } from "../../../hooks/invoice/useInvoiceItems";

interface UseInvoiceItemsFormProps {
  items: InvoiceItem[];
  onChange: (items: InvoiceItem[]) => void;
  taxRate: number;
  onTaxRateChange: (rate: number) => void;
  directAmount: number | null;
  onDirectAmountChange: (amount: number | null) => void;
}

export const useInvoiceItemsForm = ({
  items,
  onChange,
  taxRate,
  onTaxRateChange,
  directAmount,
  onDirectAmountChange
}: UseInvoiceItemsFormProps) => {
  const [useDirectAmount, setUseDirectAmount] = useState(directAmount !== null);

  useEffect(() => {
    setUseDirectAmount(directAmount !== null);
  }, [directAmount]);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      price: 0,
      total: 0,
    };
    onChange([...items, newItem]);

    if (useDirectAmount) {
      setUseDirectAmount(false);
      onDirectAmountChange(null);
    }
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        const quantity = field === 'quantity' ? Number(value) : Number(item.quantity || 0);
        const price = field === 'price' ? Number(value) : Number(item.price || 0);
        updatedItem.total = quantity * price;
        return updatedItem;
      }
      return item;
    });
    console.log("Updated items being sent to parent:", updatedItems);
    onChange(updatedItems);
  };

  const handleDirectAmountChange = (value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    onDirectAmountChange(Number.isNaN(numValue) ? 0 : numValue);
  };

  const toggleAmountType = (useDirectValue: boolean) => {
    setUseDirectAmount(useDirectValue);

    if (useDirectValue) {
      if (directAmount === null) {
        const calculatedTotal = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
        onDirectAmountChange(calculatedTotal > 0 ? calculatedTotal : 0);
      }
    } else {
      onDirectAmountChange(null);
      if (items.length === 0) {
        addItem();
      }
    }
  };

  const { subtotal, taxAmount, total } = useMemo(() => {
    console.log("Recalculating totals", { items, taxRate, directAmount, useDirectAmount });
    console.log("🧾 items in memo:", JSON.stringify(items, null, 2));

    const safeTaxRate = Number(taxRate) || 0;
    if (useDirectAmount && directAmount !== null) {
      const base = Number(directAmount) || 0;
      const calculatedTax = base * (safeTaxRate / 100);
      console.log("Direct amount mode:", { base, calculatedTax });
      return {
        subtotal: base,
        taxAmount: calculatedTax,
        total: base + calculatedTax,
      };
    } else {
      const calculatedSubtotal = items.reduce((sum, item) => {
        const quantity = Number(item.quantity || 0);
        const price = Number(item.price || 0);
        return sum + quantity * price;
      }, 0);
      const calculatedTax = calculatedSubtotal * (safeTaxRate / 100);
      console.log("Itemized mode:", { calculatedSubtotal, calculatedTax });
      return {
        subtotal: calculatedSubtotal,
        taxAmount: calculatedTax,
        total: calculatedSubtotal + calculatedTax,
      };
    }
  }, [items, taxRate, directAmount, useDirectAmount]);

  return {
    useDirectAmount,
    addItem,
    removeItem,
    updateItem,
    handleDirectAmountChange,
    toggleAmountType,
    subtotal,
    taxAmount,
    total,
  };
};