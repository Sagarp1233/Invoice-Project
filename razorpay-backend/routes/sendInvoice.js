// routes/send-invoice.ts
import express from 'express';
import { Resend } from 'resend';
import { renderInvoiceHTML } from '../lib/invoiceRenderer';
import { generateInvoicePDF } from '../lib/generateInvoicePDF';

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY || '');

router.post('/', async (req, res) => {
  const { invoiceData, recipientEmail } = req.body;

  if (!recipientEmail || !invoiceData) {
    return res.status(400).json({ error: 'Missing recipient email or invoice data.' });
  }

  try {
    const invoiceHTML = await renderInvoiceHTML(invoiceData);
    const pdfBuffer = await generateInvoicePDF(invoiceData);

    const response = await resend.emails.send({
      from: 'Invoicify Genie <noreply@yourdomain.com>',
      to: recipientEmail,
      subject: `Invoice ${invoiceData.invoiceNumber}`,
      html: invoiceHTML,
      attachments: [
        {
          filename: `${invoiceData.invoiceNumber}.pdf`,
          content: pdfBuffer.toString('base64'),
        },
      ],
    });

    return res.status(200).json({ message: 'Email sent', response });
  } catch (error) {
    console.error('Send invoice error:', error);
    return res.status(500).json({ error: 'Failed to send invoice email.' });
  }
});

export default router;
