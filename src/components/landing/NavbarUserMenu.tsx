
import { LogOut, User, Settings, FileText, LayoutTemplate, BarChart3, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PlanBadge from "@/components/common/PlanBadge";

interface NavbarUserMenuProps {
  userData: any;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const NavbarUserMenu = ({
  userData,
  onLogout,
  onNavigate,
}: NavbarUserMenuProps) => {
  const userInitial = userData?.name?.charAt(0) || userData?.email?.charAt(0) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar className="h-10 w-10 border border-muted">
            <AvatarFallback className="bg-muted text-invoice-purple">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
            <div className="pt-1">
              <PlanBadge plan="free" />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onNavigate("/dashboard")}>
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("/invoice/create")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Create Invoice</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("/invoice-templates")}>
            <LayoutTemplate className="mr-2 h-4 w-4" />
            <span>Invoice Templates</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("/reports")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("/pricing")}>
            <Tags className="mr-2 h-4 w-4" />
            <span>Pricing</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onNavigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
