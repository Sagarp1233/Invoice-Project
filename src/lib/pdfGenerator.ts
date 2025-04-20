import puppeteer from 'puppeteer';

export async function generateInvoicePDF(invoiceData: any): Promise<Buffer> {
  const html = await renderInvoiceHTML(invoiceData);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdf;
}
