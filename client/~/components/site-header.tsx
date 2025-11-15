import { DoorClosed, LogOutIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { useNavigate, useLocation } from "react-router";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { revokeSessions, signOut } from "../lib/better-auth";
import { SidebarMenuButton } from "~/components/ui/sidebar";

export function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const split = currentPath.split("/");

  async function logout() {
    await revokeSessions();
    await signOut();
    navigate("/", { replace: true });
  }

  async function home() {
    navigate("/", { replace: true });
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium capitalize">{split[3] || "Profile"}</h1>
        <div className="ml-auto flex gap-1">
          <SidebarMenuButton onClick={() => home()}>
            <DoorClosed />
            Home
          </SidebarMenuButton>
          <SidebarMenuButton onClick={() => logout()}>
            <LogOutIcon />
            Logout
          </SidebarMenuButton>
        </div>
      </div>
    </header>
  );
}
