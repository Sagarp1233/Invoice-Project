
import {
  Wallet,
  FileText,
  Users,
  Clock,
  Globe,
  Shield,
  Download,
  Mail,
} from "lucide-react";

const features = [
  {
    name: "Beautiful Templates",
    description:
      "Choose from professional, customizable invoice templates that impress clients.",
    icon: FileText,
  },
  {
    name: "Client Management",
    description:
      "Save client information for fast and easy invoicing in the future.",
    icon: Users,
  },
  {
    name: "Time-Saving",
    description:
      "Create, send, and track invoices in just minutes, not hours.",
    icon: Clock,
  },
  {
    name: "Multi-Currency",
    description:
      "Bill clients in their local currency with automatic exchange rates.",
    icon: Globe,
  },
  {
    name: "Secure Storage",
    description:
      "All your invoices are securely stored and accessible from anywhere.",
    icon: Shield,
  },
  {
    name: "Instant PDF Download",
    description:
      "Download professional-looking invoices as PDFs with a single click.",
    icon: Download,
  },
  {
    name: "Email Integration",
    description:
      "Send invoices directly to clients from the platform via email.",
    icon: Mail,
  },
  {
    name: "Payment Tracking",
    description:
      "Track payment status and send automatic reminders for overdue invoices.",
    icon: Wallet,
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
            Everything You Need to Get Paid Faster
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make invoicing effortless
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative p-6 rounded-2xl border bg-background hover:border-invoice-purple/50 transition-colors group"
            >
              <div className="h-12 w-12 rounded-lg bg-invoice-lightPurple/30 flex items-center justify-center mb-4 group-hover:bg-invoice-purple/20 transition-colors">
                <feature.icon className="h-6 w-6 text-invoice-purple" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.name}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
