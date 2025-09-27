import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Settings, User, School } from "lucide-react";

interface SchoolHeaderProps {
  userType: string;
  onLogout: () => void;
}

const SchoolHeader = ({ userType, onLogout }: SchoolHeaderProps) => {
  const getUserTypeDisplay = (type: string) => {
    switch (type) {
      case "school": return { label: "School Admin", color: "bg-primary" };
      case "teacher": return { label: "Teacher", color: "bg-secondary" };
      case "student": return { label: "Student", color: "bg-accent" };
      case "parent": return { label: "Parent", color: "bg-warning" };
      default: return { label: "User", color: "bg-muted" };
    }
  };

  const userDisplay = getUserTypeDisplay(userType);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="flex items-center space-x-2">
          <School className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold hidden sm:block">Delhi Public School</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  {userType === "school" ? "SA" : userType === "teacher" ? "T" : userType === "student" ? "S" : "P"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm hidden sm:flex">
                <span className="font-medium">John Doe</span>
                <Badge variant="secondary" className={`text-xs ${userDisplay.color} text-white`}>
                  {userDisplay.label}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default SchoolHeader;