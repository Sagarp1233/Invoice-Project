
interface PrintProps {
  invoiceData: {
    invoiceNumber: string;
  };
}

export const useInvoicePrint = ({ invoiceData }: PrintProps) => {
  const handlePrintInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = document.getElementById('invoice-preview');
      if (content) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Invoice ${invoiceData.invoiceNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              ${content.innerHTML}
            </body>
          </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return { handlePrintInvoice };
};
