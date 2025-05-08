import React from "react";
import { AdminSidePanel, TopNav } from "@admin/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Spotlight } from "@/components/ui";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider className="relative z-0">
        <div className="min-h-screen w-full z-0 overflow-hidden absolute top-0 left-0 flex flex-col items-center">
          <Spotlight />
        </div>

        <AdminSidePanel />

        <main className="grid grid-cols-1 w-full h-full transition-all duration-300">
          <div className="w-full flex flex-col gap-y-5">
            <TopNav />

            {children}
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
