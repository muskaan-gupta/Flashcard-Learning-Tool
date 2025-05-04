import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import { Home, UserCircle, Library, Plus, LogOut, Menu } from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Profile", icon: UserCircle, path: "/dashboard/profile" },
    { title: "My Cards", icon: Library, path: "/dashboard/my-cards" },
    { title: "Create Card", icon: Plus, path: "/dashboard/create-card" },
  ];

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.clear();
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-blue-100 to-white-100">
        {/* Sidebar */}
        <Sidebar className="w-64 border-rbg-gradient-to-b from-blue-600 to-white-200 shadow-sm">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-700 text-lg font-semibold px-4 py-2">
                Dashboard
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                              isActive
                                ? "bg-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <item.icon size={18} />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                  {/* Logout Option */}
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;