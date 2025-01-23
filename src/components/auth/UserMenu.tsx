import * as Avatar from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  email: string;
}

const UserMenu = ({ email }: UserMenuProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const getInitial = (email: string) => {
    return email ? email[0].toUpperCase() : '?';
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none bg-transparent h-fit w-fit">
        <Avatar.Root className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors">
          <Avatar.Fallback className="text-sm font-medium">
            {getInitial(email)}
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <User className="h-4 w-4" />
          <span className="truncate">{email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;