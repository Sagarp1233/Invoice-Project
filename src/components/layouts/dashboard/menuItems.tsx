
import {
  CreditCard,
  FileText,
  Home,
  LayoutTemplate,
  Settings,
  Users,
  BarChart3,
  Tags
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Define the MenuItem type
export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
  name?: string;
  path?: string;
  dropdown?: boolean;
  dropdownItems?: MenuItem[];
}

export const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Create Invoice",
    href: "/invoice/create",
    icon: FileText,
    name: "Create Invoice",
    path: "/invoice/create",
  },
  {
    title: "Invoice Templates",
    href: "/invoice-templates",
    icon: LayoutTemplate,
    name: "Invoice Templates",
    path: "/invoice-templates",
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
    name: "Clients",
    path: "/clients",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    name: "Reports",
    path: "/reports",
  },
  {
    title: "Pricing",
    href: "/pricing",
    icon: Tags,
    name: "Pricing",
    path: "/pricing",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    name: "Settings",
    path: "/settings",
  },
];

// Add the getDashboardMenuItems function
export const getDashboardMenuItems = (): MenuItem[] => {
  return menuItems.map(item => ({
    ...item,
    name: item.title,
    path: item.href
  }));
};

export default menuItems;
