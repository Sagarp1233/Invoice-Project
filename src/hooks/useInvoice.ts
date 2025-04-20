import { useEffect } from "react";
import { useInvoiceState } from "./invoice/useInvoiceState";
import { useInvoiceItems } from "./invoice/useInvoiceItems";
import { useInvoiceCalculations } from "./invoice/useInvoiceCalculations";
import { useInvoiceValidation } from "./invoice/useInvoiceValidation";
import { useInvoiceCurrency } from "./invoice/useInvoiceCurrency";
import { useInvoiceHandlers } from "./invoice/useInvoiceHandlers";
import { useInvoiceInitialization } from "./invoice/useInitialization";
import { useUserSettings } from "@/components/settings/useUserSettings";
import { useInvoiceEdit } from "./invoice/useInvoiceEdit";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export const useInvoice = (editInvoiceId: string | null) => {
  const { userSettings } = useUserSettings();

  const invoiceState = useInvoiceState();
  const {
    invoiceNumber, setInvoiceNumber, invoiceNumberError, setInvoiceNumberError,
    issueDate, setIssueDate, dueDate, setDueDate,
    companyInfo, setCompanyInfo, clientInfo, setClientInfo,
    invoiceCurrency, setInvoiceCurrency, taxRate, setTaxRate,
    notes, setNotes, directAmount, setDirectAmount,
    isEditMode, setIsEditMode, templateId, setTemplateId
  } = invoiceState;

  const { invoiceItems, setInvoiceItems } = useInvoiceItems();

  useInvoiceEdit({
    editInvoiceId,
    setIsEditMode,
    setInvoiceNumber,
    setIssueDate,
    setDueDate,
    setCompanyInfo,
    setClientInfo,
    setInvoiceItems,
    setTaxRate,
    setNotes,
    setTemplateId,
    setInvoiceCurrency
  });

  // ✅ Only apply default dueDate if not in edit mode and not already set
  useEffect(() => {
  const isDateValid = issueDate instanceof Date && !isNaN(issueDate.getTime());
  const isNewInvoice = isEditMode === false && !dueDate;

  if (isNewInvoice && isDateValid) {
    const defaultDue = new Date(issueDate);
    defaultDue.setDate(defaultDue.getDate() + 30);
    setDueDate(defaultDue);
  }
}, [isEditMode, issueDate, dueDate]);

console.log("🔍 useEffect for default dueDate", {
  isEditMode,
  issueDate,
  dueDate,
});

  const calculations = useInvoiceCalculations({
    invoiceItems,
    taxRate,
    directAmount
  });

  useInvoiceValidation({
    invoiceNumber,
    isEditMode,
    setInvoiceNumberError
  });

  useInvoiceCurrency({
    clientCountry: clientInfo.country,
    setCurrency: setInvoiceCurrency
  });

  const {
    generateUniqueInvoiceNumber,
    handleCompanyInfoChange,
    handleClientInfoChange
  } = useInvoiceHandlers({
    setInvoiceNumber,
    setInvoiceNumberError,
    setCompanyInfo,
    setClientInfo
  });

  useInvoiceInitialization({
    isEditMode,
    setInvoiceNumber
  });

  return {
    invoiceNumber,
    setInvoiceNumber,
    invoiceNumberError,
    issueDate,
    setIssueDate,
    dueDate,
    setDueDate,
    companyInfo,
    clientInfo,
    invoiceItems,
    setInvoiceItems,
    taxRate,
    setTaxRate,
    notes,
    setNotes,
    directAmount,
    setDirectAmount,
    isEditMode,
    templateId,
    setTemplateId,
    invoiceCurrency,
    setInvoiceCurrency,
    ...calculations,
    generateUniqueInvoiceNumber,
    handleCompanyInfoChange,
    handleClientInfoChange
  };
};
