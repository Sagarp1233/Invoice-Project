
interface PreviewProps {
  setPreviewModalOpen: (open: boolean) => void;
}

export const useInvoicePreview = ({ 
  setPreviewModalOpen 
}: PreviewProps) => {
  const handlePreviewInvoice = () => {
    setPreviewModalOpen(true);
  };

  return { handlePreviewInvoice };
};
