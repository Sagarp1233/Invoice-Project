
type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'RUB';

export const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CHF: 'Fr',
  RUB: '₽'
};

export const exchangeRates = {
  USD: 1,
  INR: 83.28,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 152.34,
  CHF: 0.90,
  RUB: 92.50
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};


export const getNextInvoiceNumber = (): string => {
  // Get saved invoices from localStorage
  const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  
  if (savedInvoices.length === 0) {
    return 'INV-001'; // Starting invoice number
  }
  
  // Sort the invoices by number to find the latest
  const sortedInvoices = [...savedInvoices].sort((a, b) => {
    // Extract the numerical part of the invoice number
    const numA = parseInt(a.invoiceNumber.replace(/[^0-9]/g, ''));
    const numB = parseInt(b.invoiceNumber.replace(/[^0-9]/g, ''));
    
    return numB - numA; // Sort in descending order
  });
  
  // Get the latest invoice number
  const latestInvoice = sortedInvoices[0];
  const latestNumber = latestInvoice.invoiceNumber;
  
  // Extract the numerical part
  const matches = latestNumber.match(/[0-9]+/);
  if (!matches) return 'INV-001';
  
  // Increment by 1
  const numPart = parseInt(matches[0]);
  const nextNum = numPart + 1;
  
  // Format with leading zeros (e.g., INV-001)
  return `INV-${String(nextNum).padStart(3, '0')}`;
};
