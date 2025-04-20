import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateInvoicePDF(invoiceData: any): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();

  const drawText = (text: string, y: number) => {
    page.drawText(text, {
      x: 50,
      y,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
  };

  let y = height - 50;
  drawText(`Invoice: ${invoiceData.invoiceNumber}`, y -= 30);
  drawText(`Client: ${invoiceData.clientInfo.name}`, y -= 30);
  drawText(`Email: ${invoiceData.clientInfo.email}`, y -= 30);
  drawText(`Total: ₹${invoiceData.total}`, y -= 30);
  drawText(`Due Date: ${invoiceData.dueDate}`, y -= 30);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
