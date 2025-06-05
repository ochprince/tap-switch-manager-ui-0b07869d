
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
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
    <Sidebar className="border-r border-gray-200" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-800 group-data-[collapsible=icon]:hidden">
            TAP 网络分流器管理系统
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
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
                    tooltip={item.title}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
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
