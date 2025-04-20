import { useUser } from "@/hooks/useUser";

export const useAccessControl = () => {
  const { profile, isAdmin, isPro } = useUser();

  return {
    isAdmin,
    isPro,

    // Fine-grained feature access
    canSendInvoice: isPro,
    canUseTemplates: isPro,
    canUseProReports: isPro && isAdmin,
    canExportData: isPro,
    canInviteUsers: isPro && isAdmin,
    canDeleteInvoices: isAdmin,
  };
};
