export async function renderInvoiceHTML(invoiceData: any): Promise<string> {
  return `
    <html>
      <body>
        <h1>Invoice: ${invoiceData.invoiceNumber}</h1>
        <p>Client: ${invoiceData.clientInfo.name}</p>
        <p>Total: ₹${invoiceData.total}</p>
        <p>Due Date: ${invoiceData.dueDate}</p>
        <!-- You can add full HTML rendering here -->
      </body>
    </html>
  `;
}
