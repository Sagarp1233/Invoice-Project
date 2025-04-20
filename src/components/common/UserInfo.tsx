
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserPlan } from '@/hooks/useUserPlan';
import PlanBadge from './PlanBadge';

interface UserInfoProps {
  userData: any;
  variant?: 'full' | 'avatar';
  onLogout?: () => void;
}

const UserInfo = ({ userData, variant = 'full', onLogout }: UserInfoProps) => {
  const navigate = useNavigate();
  const { userPlan } = useUserPlan();
  
  if (!userData) return null;
  
  // Get user's display name, with better fallbacks
  const getUserName = () => {
    // First try the name property
    if (userData.name && userData.name.trim() !== '') 
      return userData.name;
      
    // Then try user_metadata.full_name
    if (userData.user_metadata?.name && userData.user_metadata.name.trim() !== '')
      return userData.user_metadata.name;
    
    // Then try raw_user_metadata.full_name
    if (userData.raw_user_metadata?.full_name && userData.raw_user_metadata.full_name.trim() !== '')
      return userData.raw_user_metadata.full_name;
    
    // Then try email up to @
    if (userData.email) 
      return userData.email.split('@')[0];
    
    // Default fallback
    return 'User';
  };
  
  // Extract first letter of name or email for avatar
  const getInitials = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  // Only avatar version
  if (variant === 'avatar') {
    return (
      <Avatar className="h-8 w-8 cursor-pointer" onClick={() => navigate('/settings')}>
        <AvatarFallback className="bg-invoice-purple text-white">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
    );
  }

  // Full dropdown version
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100 w-full justify-start">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-invoice-purple text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="text-left overflow-hidden">
            <p className="text-sm font-medium line-clamp-1">{getUserName()}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{userData.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>My Account</span>
          <PlanBadge plan={userPlan} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          Settings
        </DropdownMenuItem>
        {userPlan === 'free' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/pricing')} className="text-invoice-purple">
              Upgrade Plan
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-700" 
          onClick={onLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
