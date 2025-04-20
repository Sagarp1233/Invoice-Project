import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, isValid } from "date-fns";
import { Download, Printer, Send } from "lucide-react";

interface InvoicePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceData: {
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    companyInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
      website: string;
      logo: string | null;
    };
    clientInfo: {
      name: string;
      email: string;
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    items: Array<{
      id: string;
      description: string;
      quantity: number;
      price: number;
      total: number;
    }>;
    taxRate: number;
    notes: string;
    subtotal: number;
    taxAmount: number;
    total: number;
    template: string;
    invoiceCurrency: string;
  };
  onDownload: () => void;
  onSend: () => void;
  onPrint: () => void;
}

interface TemplateStyle {
  accentColor: string;
  fontFamily: string;
  style: string;
}

const defaultTemplate: TemplateStyle = {
  accentColor: "#7c3aed", // Purple
  fontFamily: "sans-serif",
  style: "classic",
};

const InvoicePreviewModal: React.FC<InvoicePreviewModalProps> = ({
  open,
  onOpenChange,
  invoiceData,
  onDownload,
  onSend,
  onPrint,
}) => {
  const {
    invoiceNumber,
    issueDate,
    dueDate,
    companyInfo,
    clientInfo,
    items,
    taxRate,
    notes,
    subtotal,
    taxAmount,
    total,
    template,
    invoiceCurrency,
  } = invoiceData;

  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>(defaultTemplate);

  useEffect(() => {
    try {
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        const parsedTemplate = JSON.parse(savedTemplate);
        setTemplateStyle({
          accentColor: parsedTemplate.accentColor || defaultTemplate.accentColor,
          fontFamily: parsedTemplate.fontFamily || defaultTemplate.fontFamily,
          style: parsedTemplate.style || defaultTemplate.style,
        });
      }
    } catch (error) {
      console.error("Error loading template:", error);
    }
  }, [open]);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getTemplateClasses = () => {
    return {
      container: "bg-white p-8 border rounded-lg font-sans",
      header: "flex justify-between items-start mb-8",
      logo: "h-16 object-contain mb-2",
      heading: `text-2xl font-bold mb-2`,
      subheading: "text-sm text-gray-600",
      section: "mb-8",
      sectionTitle: "font-medium mb-2 text-gray-700",
      table: "w-full border-collapse",
      tableHeader: "bg-gray-100 text-left p-2 border-b",
      tableRow: "border-b",
      tableCell: "p-2 text-sm",
      tableCellRight: "p-2 text-sm text-right",
      footer: "mt-12 pt-8 border-t flex justify-between",
    };
  };

  const classes = getTemplateClasses();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
          <DialogDescription>
            Preview how your invoice will look before sending or downloading
          </DialogDescription>
        </DialogHeader>

        <div
          id="invoice-preview"
          className={classes.container}
          style={{ fontFamily: templateStyle.fontFamily }}
        >
          <div className={classes.header}>
            <div className="flex-1">
              {companyInfo.logo ? (
                <img
                  src={companyInfo.logo}
                  alt="Company Logo"
                  className={classes.logo}
                />
              ) : (
                <div
                  className={classes.heading}
                  style={{ color: templateStyle.accentColor }}
                >
                  {companyInfo.name}
                </div>
              )}
              <div className={classes.subheading}>
                <p>{(companyInfo.address ?? "").split("\n").join(", ")}</p>
                <p>
                  {companyInfo.email} | {companyInfo.phone}
                </p>
                {companyInfo.website && <p>{companyInfo.website}</p>}
              </div>
            </div>

            <div className="text-right">
              <h1
                className={classes.heading}
                style={{ color: templateStyle.accentColor }}
              >
                INVOICE
              </h1>
              <div className="text-sm">
                <p className="mb-1">
                  <span className="font-medium">Invoice Number:</span>{" "}
                  {invoiceNumber}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Issue Date:</span>{" "}
                  {isValid(issueDate) ? format(issueDate, "MMM d, yyyy") : "—"}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span>{" "}
                  {isValid(dueDate) ? format(dueDate, "MMM d, yyyy") : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Bill To:</h2>
            <div className="text-sm">
              <p className="font-medium text-gray-800">{clientInfo.name}</p>
              <p>{clientInfo.address}</p>
              <p>
                {clientInfo.city}, {clientInfo.state} {clientInfo.zip}
              </p>
              <p>{clientInfo.country}</p>
              <p>{clientInfo.email}</p>
            </div>
          </div>

          <div className={classes.section}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.tableHeader}>Item Description</th>
                  <th className={`${classes.tableHeader} text-right`}>Qty</th>
                  <th className={`${classes.tableHeader} text-right`}>
                    Unit Price
                  </th>
                  <th className={`${classes.tableHeader} text-right`}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className={classes.tableRow}>
                    <td className={classes.tableCell}>{item.description}</td>
                    <td className={classes.tableCellRight}>{item.quantity}</td>
                    <td className={classes.tableCellRight}>
                      {formatCurrency(item.price, invoiceCurrency)}
                    </td>
                    <td className={classes.tableCellRight}>
                      {formatCurrency(item.total, invoiceCurrency)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} className="p-2"></td>
                  <td className={`${classes.tableCellRight} font-medium`}>
                    Subtotal
                  </td>
                  <td className={classes.tableCellRight}>
                    {formatCurrency(subtotal, invoiceCurrency)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="p-2"></td>
                  <td className={`${classes.tableCellRight} font-medium`}>
                    Tax ({taxRate}%)
                  </td>
                  <td className={classes.tableCellRight}>
                    {formatCurrency(taxAmount, invoiceCurrency)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={2} className="p-2"></td>
                  <td className={`${classes.tableCellRight} font-bold`}>
                    Total
                  </td>
                  <td
                    className={`${classes.tableCellRight} font-bold`}
                    style={{ color: templateStyle.accentColor }}
                  >
                    {formatCurrency(total, invoiceCurrency)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {notes && (
            <div className={classes.section}>
              <h3 className={classes.sectionTitle}>Notes</h3>
              {(notes ?? "").split("\n").map((line, index) => (
                <p key={index} className="text-sm text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          )}

          <div className={classes.footer}>
            <div className="w-1/3">
              <div className="border-b border-dashed border-gray-400 h-8 mb-2"></div>
              <p className="text-sm text-center">Authorized Signature</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onPrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" onClick={onDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button
            style={{ backgroundColor: templateStyle.accentColor }}
            className="hover:opacity-90 text-white"
            onClick={onSend}
          >
            <Send className="mr-2 h-4 w-4" /> Send Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePreviewModal;
