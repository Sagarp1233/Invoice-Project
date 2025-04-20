
// Define plan types and features
export type UserPlan = 'free' | 'pro' | 'business';

export interface Feature {
  id: string;
  name: string;
  description: string;
  requiredPlan: UserPlan;
}

// Define features and their required plans
export const FEATURES: Record<string, Feature> = {
  STANDARD_TEMPLATE: {
    id: 'standard_template',
    name: 'Standard Invoice Template',
    description: 'Basic invoice template for all users',
    requiredPlan: 'free'
  },
  MODERN_TEMPLATE: {
    id: 'modern_template',
    name: 'Modern Template',
    description: 'Modern and sleek invoice design',
    requiredPlan: 'pro'
  },
  MINIMALIST_TEMPLATE: {
    id: 'minimalist_template',
    name: 'Minimalist Template',
    description: 'Clean and simple invoice layout',
    requiredPlan: 'pro'
  },
  GST_TEMPLATE: {
    id: 'gst_template',
    name: 'GST Template',
    description: 'Template with GST tax calculation',
    requiredPlan: 'pro'
  },
  CREATIVE_TEMPLATE: {
    id: 'creative_template',
    name: 'Creative Template',
    description: 'Artistic layout for creative professionals',
    requiredPlan: 'pro'
  },
  CORPORATE_TEMPLATE: {
    id: 'corporate_template',
    name: 'Corporate Template',
    description: 'Formal design for corporate entities',
    requiredPlan: 'business'
  },
  RECURRING_INVOICES: {
    id: 'recurring_invoices',
    name: 'Recurring Invoices',
    description: 'Set up repeating invoices for regular clients',
    requiredPlan: 'business'
  },
  EXPORT_HISTORY: {
    id: 'export_history',
    name: 'Export History',
    description: 'Export your invoice history',
    requiredPlan: 'pro'
  },
  ADVANCED_ANALYTICS: {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Detailed reports and analytics',
    requiredPlan: 'business'
  },
  REMOVE_WATERMARK: {
    id: 'remove_watermark',
    name: 'Remove Watermark',
    description: 'Remove watermark from invoices',
    requiredPlan: 'pro'
  },
  EMAIL_INVOICES: {
    id: 'email_invoices',
    name: 'Email Invoices',
    description: 'Send invoices via email',
    requiredPlan: 'free'
  },
  BULK_ACTIONS: {
    id: 'bulk_actions',
    name: 'Bulk Actions',
    description: 'Perform actions on multiple invoices',
    requiredPlan: 'business'
  }
};

// Plan hierarchy for feature access
const PLAN_HIERARCHY: Record<UserPlan, number> = {
  'free': 0,
  'pro': 1,
  'business': 2
};

// Utility function to check if a feature is available for a given plan
export const isFeatureAvailable = (featureId: string, userPlan: UserPlan = 'free'): boolean => {
  const feature = FEATURES[featureId];
  
  if (!feature) {
    console.warn(`Feature ${featureId} not found in ACL`);
    return false;
  }
  
  const userPlanLevel = PLAN_HIERARCHY[userPlan];
  const requiredPlanLevel = PLAN_HIERARCHY[feature.requiredPlan];
  
  return userPlanLevel >= requiredPlanLevel;
};

// Helper function to get feature requirement text
export const getFeatureRequirementText = (featureId: string): string => {
  const feature = FEATURES[featureId];
  
  if (!feature) {
    return 'Upgrade required';
  }
  
  return `${feature.requiredPlan.charAt(0).toUpperCase() + feature.requiredPlan.slice(1)} Plan required`;
};

// Get a badge text for a feature
export const getFeatureBadgeText = (featureId: string): string => {
  const feature = FEATURES[featureId];
  
  if (!feature) {
    return '';
  }
  
  const planName = feature.requiredPlan.charAt(0).toUpperCase() + feature.requiredPlan.slice(1);
  return feature.requiredPlan === 'free' ? '' : `${planName} Only 🔒`;
};
