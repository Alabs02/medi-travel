"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { ImagePaths } from "@/constants";
import {
  IconLayoutGrid,
  IconListDetails,
  IconLogout,
  IconReportSearch,
  IconUsersGroup,
  IconUserShield
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { Motion } from "@/components/ui";
import { useLogout } from "@/hooks";
import { useRouter } from "next/navigation";
import { cn } from "@/lib";
import { useAuthStore } from "@/store/auth";

export const AdminSidePanel = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar();
  const { mutateAsync, isPending } = useLogout();
  const { setTkn, resetProfile, logout } = useAuthStore();

  const onLogout = async () => {
    await mutateAsync();

    setTkn("");
    resetProfile();
    logout();

    setTimeout(() => {
      router.replace("/");
    }, 200);
  };

  return (
    <>
      {open && (
        <Sidebar>
          <SidebarHeader className="p-3">
            <div className="flex items-center w-full h-12">
              <Link href="/" className="flex space-x-2.5 items-center" passHref>
                <div className="size-10 relative overflow-hidden">
                  <Image
                    src={ImagePaths.BRAND_LOGO}
                    alt="MediTravel"
                    width={104}
                    height={116}
                    quality={100}
                    draggable={false}
                    priority
                    className="size-full object-contain"
                  />
                </div>

                <span className="font-plus-sans font-bold text-xl tracking-[0.015em] hidden lg:inline-block">
                  MediTravel
                </span>
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent className="justify-between">
            <SidebarGroup className="px-3 py-5 flex flex-col gap-y-1.5">
              <button
                type="button"
                className={cn(
                  "flex items-center bg-background gap-x-2.5 w-full p-2.5 rounded-md text-foreground/75 hover:text-accent hover:bg-accent/15 hover:shadow border-none outline-none transition-all duration-300",
                  pathname.includes("#") && "bg-accent/15 text-accent"
                )}
              >
                <IconLayoutGrid />
                <span className="text-sm md:text-base font-outfit">
                  Dashboard
                </span>
              </button>

              <button
                type="button"
                className={cn(
                  "flex items-center bg-background gap-x-2.5 w-full p-2.5 rounded-md text-foreground/75 hover:text-accent hover:bg-accent/15 hover:shadow border-none outline-none transition-all duration-300",
                  pathname.includes("/admin") && "bg-accent/15 text-accent"
                )}
              >
                <IconUsersGroup />
                <span className="text-sm md:text-base font-outfit">Users</span>
              </button>

              <button
                type="button"
                className={cn(
                  "flex items-center bg-background gap-x-2.5 w-full p-2.5 rounded-md text-foreground/75 hover:text-accent hover:bg-accent/15 hover:shadow border-none outline-none transition-all duration-300",
                  pathname.includes("#") && "bg-accent/15 text-accent"
                )}
              >
                <IconUserShield />
                <span className="text-sm md:text-base font-outfit">
                  Roles & Permissions
                </span>
              </button>

              <button
                type="button"
                className={cn(
                  "flex items-center bg-background gap-x-2.5 w-full p-2.5 rounded-md text-foreground/75 hover:text-accent hover:bg-accent/15 hover:shadow border-none outline-none transition-all duration-300",
                  pathname.includes("#") && "bg-accent/15 text-accent"
                )}
              >
                <IconListDetails />
                <span className="text-sm md:text-base font-outfit">
                  Pending Requests
                </span>
              </button>

              <button
                type="button"
                className={cn(
                  "flex items-center bg-background gap-x-2.5 w-full p-2.5 rounded-md text-foreground/75 hover:text-accent hover:bg-accent/15 hover:shadow border-none outline-none transition-all duration-300",
                  pathname.includes("#") && "bg-accent/15 text-accent"
                )}
              >
                <IconReportSearch />
                <span className="text-sm md:text-base font-outfit">
                  Audit Log
                </span>
              </button>
            </SidebarGroup>

            <SidebarFooter className="px-3">
              <Motion.OutlinedButton
                type="button"
                onClick={onLogout}
                disabled={isPending}
                className="!px-3"
              >
                <IconLogout />
                <span className="font-outfit">
                  {isPending ? "Please wait..." : "Logout"}
                </span>
              </Motion.OutlinedButton>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
      )}
    </>
  );
};
