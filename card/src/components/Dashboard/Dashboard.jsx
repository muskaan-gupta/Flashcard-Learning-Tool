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
import { Home, UserCircle, Library, Plus } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();

  const menuItems = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Profile", icon: UserCircle, path: "/dashboard/profile" },
    { title: "My Cards", icon: Library, path: "/dashboard/my-cards" },
    { title: "Create Card", icon: Plus, path: "/dashboard/create-card" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="w-64 border-r bg-white shadow-sm">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-700 text-lg font-semibold px-4 py-2">Dashboard</SidebarGroupLabel>
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
