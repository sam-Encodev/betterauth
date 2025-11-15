import { redirect } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { ChartAreaInteractive } from "~/components/chart-area-interactive";
import { DataTable } from "~/components/data-table";
import { SectionCards } from "~/components/section-cards";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { useSession } from "~/lib/better-auth";
import data from "../dashboard/data.json";

export default function Page() {
  const session = useSession();

  if (!session) {
    redirect("/login");
  }

  const user = session?.data?.user;

  console.log({ user })

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        user={{
          name: user?.name || "",
          email: user?.email || "",
          id: user?.id || "",
          createdAt: user?.updatedAt ? new Date(user.createdAt) : undefined,
          updatedAt: user?.updatedAt ? new Date(user.updatedAt) : undefined,
          emailVerified: user?.emailVerified || false,
          avatar: user?.image || "",
        }}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
