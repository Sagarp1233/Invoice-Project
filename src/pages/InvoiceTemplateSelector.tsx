// InvoiceTemplateSelector.tsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import InvoiceTemplateCard from "@/components/invoice/InvoiceTemplateCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserPlan } from "@/hooks/useUserPlan";
import { isFeatureAvailable, getFeatureBadgeText } from "@/utils/acl";
import { LockIcon, LayoutTemplate } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const templates = [
  {
    id: "standard",
    name: "Standard",
    imageUrl: "/templates/standard.png",
    featureId: "STANDARD_TEMPLATE",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    imageUrl: "/templates/minimalist.png",
    featureId: "MINIMALIST_TEMPLATE",
  },
  {
    id: "classic",
    name: "Classic",
    imageUrl: "/templates/classic.png",
    featureId: "CLASSIC_TEMPLATE",
  },
  {
    id: "modern",
    name: "Modern",
    imageUrl: "/templates/modern.png",
    featureId: "MODERN_TEMPLATE",
  },
  {
    id: "creative",
    name: "Creative",
    imageUrl: "/templates/creative.png",
    featureId: "CREATIVE_TEMPLATE",
  },
  {
    id: "corporate",
    name: "Corporate",
    imageUrl: "/templates/corporate.png",
    featureId: "CORPORATE_TEMPLATE",
  },
];

const InvoiceTemplateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { userPlan } = useUserPlan();
  const query = new URLSearchParams(location.search);
  const existingTemplate = query.get("current");

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [lockedFeature, setLockedFeature] = useState("");

  useEffect(() => {
    if (existingTemplate) {
      setSelectedTemplate(existingTemplate);
    } else {
      const stored = localStorage.getItem("selectedTemplate");
      if (stored) {
        try {
          const template = JSON.parse(stored);
          setSelectedTemplate(template.id);
        } catch (e) {}
      }
    }
  }, [existingTemplate]);

  const handleSelectTemplate = (id: string) => {
    const template = templates.find((t) => t.id === id);
    if (!template) return;

    if (isFeatureAvailable(template.featureId, userPlan)) {
      setSelectedTemplate(id);
      localStorage.setItem("selectedTemplate", JSON.stringify(template));
      toast({
        title: "Template Selected",
        description: `You've selected the ${template.name} template.`,
      });
    } else {
      setLockedFeature(template.name);
      setUpgradeDialogOpen(true);
    }
  };

  const handleContinue = () => {
    const template = templates.find((t) => t.id === selectedTemplate);
    if (!template) return;

    if (!isFeatureAvailable(template.featureId, userPlan)) {
      setLockedFeature(template.name);
      setUpgradeDialogOpen(true);
      return;
    }

    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    toast({
      title: "Template Applied",
      description: `The ${template.name} template has been applied to your invoices.`,
    });
    navigate(`/create-invoice?template=${template.id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="h-6 w-6 text-invoice-purple" />
          <h1 className="text-3xl font-bold">Invoice Templates</h1>
        </div>
        <p className="text-muted-foreground">Choose a template for your invoice</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <InvoiceTemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              imageUrl={template.imageUrl}
              isSelected={selectedTemplate === template.id}
              onSelect={handleSelectTemplate}
              disabled={!isFeatureAvailable(template.featureId, userPlan)}
              badge={getFeatureBadgeText(template.featureId)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            className="bg-invoice-purple hover:bg-invoice-darkPurple"
            size="lg"
            disabled={
              !selectedTemplate ||
              !isFeatureAvailable(
                templates.find((t) => t.id === selectedTemplate)?.featureId ?? "",
                userPlan
              )
            }
            onClick={handleContinue}
          >
            Continue with Selected Template
          </Button>
        </div>
      </div>

      <Dialog open={upgradeDialogOpen} onOpenChange={setUpgradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LockIcon className="h-5 w-5 text-amber-500" />
              Premium Template
            </DialogTitle>
            <DialogDescription>
              The {lockedFeature} template is available in the Pro plan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Upgrade your plan to unlock all premium templates and advanced features.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-invoice-purple hover:bg-invoice-darkPurple"
              onClick={() => {
                setUpgradeDialogOpen(false);
                navigate("/pricing");
              }}
            >
              View Pricing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InvoiceTemplateSelector;
