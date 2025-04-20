import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface DownloadProps {
  invoiceRef: React.RefObject<HTMLDivElement>;
  setPreviewModalOpen: (open: boolean) => void;
  invoiceData: {
    invoiceNumber: string;
    companyInfo: any;
    clientInfo: any;
    items: any[];
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    notes: string;
    issueDate: Date;
    dueDate: Date;
    invoiceCurrency: string;
  };
}

export const useInvoiceDownload = ({
  invoiceRef,
  setPreviewModalOpen,
  invoiceData
}: DownloadProps) => {
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: invoiceData.invoiceCurrency || "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current) return;

    toast({
      title: "Preparing PDF",
      description: "Your invoice is being generated...",
    });

    try {
      setPreviewModalOpen(false);

      setTimeout(async () => {
        const formattedSubtotal = formatCurrency(invoiceData.subtotal);
        const formattedTaxAmount = formatCurrency(invoiceData.taxAmount);
        const formattedTotal = formatCurrency(invoiceData.total);

        const itemsHtml = invoiceData.items.map((item) => {
          const formattedPrice = formatCurrency(item.price);
          const formattedTotal = formatCurrency(item.total);
          return `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">${formattedPrice}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb;">${formattedTotal}</td>
            </tr>
          `;
        }).join('');

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `
          <div id="pdf-content" style="width: 800px; padding: 40px; background: white;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
              <div>
                <h2 style="color: #7c3aed; margin: 0;">${invoiceData.companyInfo.name}</h2>
                <p style="margin: 5px 0; font-size: 14px;">${invoiceData.companyInfo.address.replace(/\n/g, '<br>')}</p>
                <p style="margin: 5px 0; font-size: 14px;">${invoiceData.companyInfo.email} | ${invoiceData.companyInfo.phone}</p>
              </div>
              <div style="text-align: right;">
                <h1 style="color: #7c3aed; margin: 0; font-size: 24px;">INVOICE</h1>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Issue Date:</strong> ${new Date(invoiceData.issueDate).toLocaleDateString()}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Due Date:</strong> ${new Date(invoiceData.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="margin-bottom: 10px;">Bill To:</h3>
              <p style="margin: 3px 0; font-size: 14px;"><strong>${invoiceData.clientInfo.name}</strong></p>
              <p style="margin: 3px 0; font-size: 14px;">${invoiceData.clientInfo.address}</p>
              <p style="margin: 3px 0; font-size: 14px;">${invoiceData.clientInfo.city}, ${invoiceData.clientInfo.state} ${invoiceData.clientInfo.zip}</p>
              <p style="margin: 3px 0; font-size: 14px;">${invoiceData.clientInfo.country}</p>
              <p style="margin: 3px 0; font-size: 14px;">${invoiceData.clientInfo.email}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <thead>
                <tr style="background-color: #f3f4f6;">
                  <th style="text-align: left; padding: 10px; border-bottom: 1px solid #e5e7eb;">Item Description</th>
                  <th style="text-align: right; padding: 10px; border-bottom: 1px solid #e5e7eb;">Qty</th>
                  <th style="text-align: right; padding: 10px; border-bottom: 1px solid #e5e7eb;">Unit Price</th>
                  <th style="text-align: right; padding: 10px; border-bottom: 1px solid #e5e7eb;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2"></td>
                  <td style="padding: 10px; text-align: right; font-weight: 500;">Subtotal</td>
                  <td style="padding: 10px; text-align: right;">${formattedSubtotal}</td>
                </tr>
                <tr>
                  <td colspan="2"></td>
                  <td style="padding: 10px; text-align: right; font-weight: 500;">Tax (${invoiceData.taxRate}%)</td>
                  <td style="padding: 10px; text-align: right;">${formattedTaxAmount}</td>
                </tr>
                <tr style="background-color: #f3f4f6;">
                  <td colspan="2"></td>
                  <td style="padding: 10px; text-align: right; font-weight: 700;">Total</td>
                  <td style="padding: 10px; text-align: right; font-weight: 700;">${formattedTotal}</td>
                </tr>
              </tfoot>
            </table>

            ${invoiceData.notes ? `
              <div style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 10px;">Notes</h3>
                <p style="font-size: 14px; color: #4b5563;">${invoiceData.notes}</p>
              </div>
            ` : ''}

            <div style="margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
              <div style="width: 200px; border-bottom: 1px dashed #9ca3af; height: 30px; margin-bottom: 10px;"></div>
              <p style="font-size: 14px; text-align: center; width: 200px;">Authorized Signature</p>
            </div>
          </div>
        `;

        document.body.appendChild(tempDiv);
        const content = document.getElementById("pdf-content");

        if (content) {
          const canvas = await html2canvas(content, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
          });

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          const imgWidth = 210;
          const pageHeight = 297;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
          pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);

          document.body.removeChild(tempDiv);

          toast({
            title: "PDF Downloaded",
            description: "Your invoice has been downloaded as a PDF.",
          });
        }
      }, 300);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return { handleDownloadInvoice };
};
