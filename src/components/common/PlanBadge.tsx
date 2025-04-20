
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserPlan } from '@/utils/acl';

interface PlanBadgeProps {
  plan: UserPlan;
  className?: string;
}

const PlanBadge: React.FC<PlanBadgeProps> = ({ plan, className = '' }) => {
  const getPlanColor = () => {
    switch (plan) {
      case 'business':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'pro':
        return 'bg-invoice-purple hover:bg-invoice-darkPurple';
      case 'free':
      default:
        return 'bg-green-500 hover:bg-green-600';
    }
  };

  return (
    <Badge className={`${getPlanColor()} ${className}`}>
      {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
    </Badge>
  );
};

export default PlanBadge;
