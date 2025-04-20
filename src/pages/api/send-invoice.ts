import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { renderInvoiceHTML } from '@/lib/invoiceRenderer';
import { generateInvoicePDF } from '@/lib/pdfGenerator'; // Optional
import fs from 'fs';
import path from 'path';
import { VercelRequest, VercelResponse } from '@vercel/node';


const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { invoiceData, recipientEmail } = req.body;

  if (!recipientEmail || !invoiceData) {
    return res.status(400).json({ error: 'Missing recipient email or invoice data.' });
  }

  try {
    // ✅ 1. Generate HTML
    const invoiceHTML = await renderInvoiceHTML(invoiceData);

    // ✅ 2. Optional PDF Generation
    const pdfBuffer = await generateInvoicePDF(invoiceData); // You can toggle this

    // ✅ 3. Send via Resend
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
  } catch (err: any) {
    console.error('Send invoice error:', err);
    return res.status(500).json({ error: 'Failed to send invoice email.' });
  }
}
