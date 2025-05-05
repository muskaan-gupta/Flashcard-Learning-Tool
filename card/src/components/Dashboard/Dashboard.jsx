import { useState } from "react";
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
import { Home, UserCircle, Library, Plus, LogOut, Menu, X } from "lucide-react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Profile", icon: UserCircle, path: "/dashboard/profile" },
    { title: "My Cards", icon: Library, path: "/dashboard/my-cards" },
    { title: "Create Card", icon: Plus, path: "/dashboard/create-card" },
    { title: "Explore-Card", icon: Library, path: "/dashboard/explore" },
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
      <div className="min-h-screen flex w-full bg-gradient-to-b from-white to-blue-200 relative">
        {/* Menu Icon for Small Screens */}
        <button
          className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-blue-500 text-white shadow-md"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        {/* Sidebar for large Screen */}
        <Sidebar className="hidden md:block w-64 border-r  h-full flex flex-col ">
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
                                ? "bg-blue-600 text-white font-bold "
                                : "text-gray-700 bg-white"
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
                      className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-600 transition-colors duration-200 hover:text-white-600"
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
         {/* Mobile Menu Drawer */}
         {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
            <div className="w-64 bg-gradient-to-b from-blue-600 to-white-200 shadow-lg h-full flex flex-col">
              <button
                className="self-end p-4 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={24} />
              </button>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-white text-xl font-semibold px-4 py-2">
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
                                    : "text-gray-200 hover:bg-gray-100"
                                }`}
                                onClick={() => setIsMenuOpen(false)}
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
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;