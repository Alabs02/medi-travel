import type { ReactNode } from "react";
import { PageLayout } from '@/layouts'
import { Spotlight } from "@/components/ui";

export default function ClinicLayout({ children }: { children: ReactNode }) {
  return (
    <PageLayout>
      <div className="absolute top-0 w-full h-screen overflow-hidden z-0">
        <Spotlight />
      </div>
      {children}
    </PageLayout>
  )
}
