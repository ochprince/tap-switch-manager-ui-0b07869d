
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SwitchDashboard } from "@/components/switch-dashboard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SwitchDashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
