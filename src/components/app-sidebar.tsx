
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Network, Settings, BarChart3, Shield, Users } from "lucide-react";

const menuItems = [
  {
    title: "TAP管理",
    icon: Network,
    isActive: true,
  },
  {
    title: "网络监控",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "安全管理",
    icon: Shield,
    isActive: false,
  },
  {
    title: "用户管理",
    icon: Users,
    isActive: false,
  },
  {
    title: "系统设置",
    icon: Settings,
    isActive: false,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-gray-800 px-4 py-6">
            TAP 网络分流器管理系统
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`w-full justify-start px-4 py-3 text-left ${
                      item.isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
