
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';
import UserInfo from '@/components/common/UserInfo';

interface MobileHeaderProps {
  onMenuOpen: () => void;
  user: any;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuOpen, user }) => {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b">
      <Button variant="ghost" size="icon" onClick={onMenuOpen}>
        <Menu className="h-6 w-6" />
      </Button>
      <Logo variant="small" />
      <UserInfo userData={user} variant="avatar" />
    </header>
  );
};

export default MobileHeader;
