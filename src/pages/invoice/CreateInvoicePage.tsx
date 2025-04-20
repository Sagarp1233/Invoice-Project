import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useInvoice } from "@/hooks/useInvoice";
import InvoiceHeader from "@/components/invoice/InvoiceHeader";
import InvoicePreviewModal from "@/components/invoice/InvoicePreviewModal";
import InvoiceFormTabs from "@/pages/invoice/components/InvoiceFormTabs";
import InvoiceSummarySection from "@/pages/invoice/components/InvoiceSummarySection";
import { useInvoiceActions } from "@/components/invoice/actions";
import { supabase } from "@/integrations/supabase/client";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CreateInvoicePage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const templateId = query.get("template");
  const editInvoiceId = query.get("edit");
  const invoiceRef = useRef(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/auth/login');
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const {
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
    templateId: selectedTemplateId,
    invoiceCurrency,
    setInvoiceCurrency,
    subtotal,
    taxAmount,
    total,
    generateUniqueInvoiceNumber,
    handleCompanyInfoChange,
    handleClientInfoChange
  } = useInvoice(editInvoiceId);

  useEffect(() => {
    const generateSequentialNumber = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("invoices")
        .select("invoicenumber")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching invoice numbers:", error);
        return;
      }

      const invoiceNumbers = data
        .map(inv => inv.invoicenumber)
        .filter(num => /^INV-\d+$/.test(num))
        .map(num => parseInt(num.replace("INV-", ""), 10));

      const max = invoiceNumbers.length ? Math.max(...invoiceNumbers) : 0;
      const nextNumber = `INV-${(max + 1).toString().padStart(3, "0")}`;
      setInvoiceNumber(nextNumber);
    };

    if (!editInvoiceId) generateSequentialNumber();
  }, [editInvoiceId, setInvoiceNumber]);

  const invoiceData = {
    invoiceNumber,
    issueDate,
    dueDate,
    companyInfo,
    clientInfo,
    items: invoiceItems,
    taxRate,
    notes,
    subtotal,
    taxAmount,
    total,
    template: templateId || selectedTemplateId || 'default',
    currency: invoiceCurrency,
  };

  const {
    handleSaveInvoice,
    handlePreviewInvoice,
    handleDownloadInvoice,
    handlePrintInvoice,
    handleSendInvoice
  } = useInvoiceActions(
    invoiceRef,
    isEditMode,
    editInvoiceId,
    invoiceData,
    setPreviewModalOpen,
    invoiceNumberError
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6">
        <InvoiceHeader 
          isEditMode={isEditMode}
          invoiceNumberError={invoiceNumberError}
          onBack={handleBack}
          onSave={handleSaveInvoice}
          onPreview={handlePreviewInvoice}
          onPrint={handlePrintInvoice}
          onDownload={handleDownloadInvoice}
          onSend={handleSendInvoice}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-x-auto">
            <InvoiceFormTabs
              invoiceNumber={invoiceNumber}
              invoiceNumberError={invoiceNumberError}
              issueDate={issueDate}
              dueDate={dueDate}
              clientInfo={clientInfo}
              companyInfo={companyInfo}
              invoiceItems={invoiceItems}
              taxRate={taxRate}
              directAmount={directAmount}
              notes={notes}
              currency={invoiceCurrency}
              onInvoiceNumberChange={setInvoiceNumber}
              onGenerateInvoiceNumber={generateUniqueInvoiceNumber}
              onIssueDateChange={setIssueDate}
              onDueDateChange={setDueDate}
              onClientInfoChange={handleClientInfoChange}
              onCompanyInfoChange={handleCompanyInfoChange}
              onInvoiceItemsChange={setInvoiceItems}
              onTaxRateChange={setTaxRate}
              onDirectAmountChange={setDirectAmount}
              onNotesChange={setNotes}
            />
          </Card>

          <InvoiceSummarySection
            invoiceNumber={invoiceNumber}
            issueDate={issueDate}
            dueDate={dueDate}
            clientInfo={clientInfo}
            subtotal={subtotal}
            taxRate={taxRate}
            taxAmount={taxAmount}
            total={total}
            templateId={templateId || selectedTemplateId}
            currency={invoiceCurrency}
          />
        </div>
      </div>

      <div className="hidden">
        <div id="invoice-preview" ref={invoiceRef}></div>
      </div>

      <InvoicePreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        invoiceData={invoiceData}
        onDownload={handleDownloadInvoice}
        onSend={handleSendInvoice}
        onPrint={handlePrintInvoice}
      />
    </DashboardLayout>
  );
};

export default CreateInvoicePage;